import type { Express } from "express";
import { createServer, type Server } from "http";
import { WebSocketServer, WebSocket } from "ws";
import multer from "multer";
import { storage } from "./storage";
import { insertIdeaSchema, insertCommentSchema } from "@shared/schema";
import { z } from "zod";

// Configure multer for file uploads
const upload = multer({
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  }
});

// WebSocket clients tracking
const wsClients = new Set<WebSocket>();

function broadcast(data: any) {
  const message = JSON.stringify(data);
  wsClients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(message);
    }
  });
}

// Auto-suggest tags from description
function suggestTags(description: string): string[] {
  if (!description) return [];
  const keywords = [
    'education', 'water', 'health', 'energy', 'equality', 'climate', 
    'hunger', 'justice', 'poverty', 'environment', 'innovation',
    'technology', 'AI', 'solar', 'community', 'sustainable',
    'rural', 'urban', 'development', 'partnership'
  ];
  return keywords.filter(keyword => 
    description.toLowerCase().includes(keyword.toLowerCase())
  );
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Get all ideas
  app.get('/api/ideas', async (req, res) => {
    try {
      const { category, stage, search } = req.query;
      
      let ideas;
      if (search) {
        ideas = await storage.searchIdeas(search as string);
      } else if (category) {
        ideas = await storage.getIdeasByCategory(parseInt(category as string));
      } else if (stage) {
        ideas = await storage.getIdeasByStage(parseInt(stage as string));
      } else {
        ideas = await storage.getAllIdeas();
      }
      
      res.json(ideas);
    } catch (error) {
      console.error('Error fetching ideas:', error);
      res.status(500).json({ message: 'Failed to fetch ideas' });
    }
  });

  // Get idea by ID
  app.get('/api/ideas/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const idea = await storage.getIdeaById(id);
      
      if (!idea) {
        return res.status(404).json({ message: 'Idea not found' });
      }
      
      res.json(idea);
    } catch (error) {
      console.error('Error fetching idea:', error);
      res.status(500).json({ message: 'Failed to fetch idea' });
    }
  });

  // Create new idea
  app.post('/api/ideas', upload.single('image'), async (req, res) => {
    try {
      // Parse form data
      const ideaData = {
        title: req.body.title,
        description: req.body.description,
        name: req.body.name,
        category: parseInt(req.body.category),
        stage: parseInt(req.body.stage) || 0,
        imageData: null as string | null,
        tags: [] as string[],
      };

      // Process image if uploaded
      if (req.file) {
        ideaData.imageData = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`;
      }

      // Auto-suggest tags
      ideaData.tags = suggestTags(ideaData.description);

      // Validate data
      const validatedData = insertIdeaSchema.parse(ideaData);
      
      // Create idea
      const newIdea = await storage.createIdea(validatedData);
      const ideaWithComments = await storage.getIdeaById(newIdea.id);
      
      // Broadcast to WebSocket clients
      broadcast({
        type: 'idea_created',
        data: ideaWithComments
      });
      
      res.status(201).json(ideaWithComments);
    } catch (error) {
      console.error('Error creating idea:', error);
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: 'Invalid data', errors: error.errors });
      } else {
        res.status(500).json({ message: 'Failed to create idea' });
      }
    }
  });

  // Update idea
  app.put('/api/ideas/:id', upload.single('image'), async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      
      const updateData: any = {
        title: req.body.title,
        description: req.body.description,
        category: parseInt(req.body.category),
        stage: parseInt(req.body.stage),
      };

      // Process image if uploaded
      if (req.file) {
        updateData.imageData = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`;
      }

      // Auto-suggest tags if description changed
      if (updateData.description) {
        updateData.tags = suggestTags(updateData.description);
      }

      // Clean undefined values
      Object.keys(updateData).forEach(key => {
        if (updateData[key] === undefined) {
          delete updateData[key];
        }
      });
      
      const updatedIdea = await storage.updateIdea(id, updateData);
      
      if (!updatedIdea) {
        return res.status(404).json({ message: 'Idea not found' });
      }

      const ideaWithComments = await storage.getIdeaById(id);
      
      // Broadcast to WebSocket clients
      broadcast({
        type: 'idea_updated',
        data: ideaWithComments
      });
      
      res.json(ideaWithComments);
    } catch (error) {
      console.error('Error updating idea:', error);
      res.status(500).json({ message: 'Failed to update idea' });
    }
  });

  // Delete idea
  app.delete('/api/ideas/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const success = await storage.deleteIdea(id);
      
      if (!success) {
        return res.status(404).json({ message: 'Idea not found' });
      }

      // Broadcast to WebSocket clients
      broadcast({
        type: 'idea_deleted',
        data: { id }
      });
      
      res.json({ message: 'Idea deleted successfully' });
    } catch (error) {
      console.error('Error deleting idea:', error);
      res.status(500).json({ message: 'Failed to delete idea' });
    }
  });

  // Like idea
  app.post('/api/ideas/:id/like', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const likedIdea = await storage.likeIdea(id);
      
      if (!likedIdea) {
        return res.status(404).json({ message: 'Idea not found' });
      }

      const ideaWithComments = await storage.getIdeaById(id);
      
      // Broadcast to WebSocket clients
      broadcast({
        type: 'idea_liked',
        data: ideaWithComments
      });
      
      res.json(ideaWithComments);
    } catch (error) {
      console.error('Error liking idea:', error);
      res.status(500).json({ message: 'Failed to like idea' });
    }
  });

  // Create comment
  app.post('/api/ideas/:id/comments', async (req, res) => {
    try {
      const ideaId = parseInt(req.params.id);
      
      const commentData = {
        ideaId,
        content: req.body.content,
        authorName: req.body.authorName,
      };
      
      const validatedData = insertCommentSchema.parse(commentData);
      const newComment = await storage.createComment(validatedData);
      
      // Get updated idea with comments
      const ideaWithComments = await storage.getIdeaById(ideaId);
      
      // Broadcast to WebSocket clients
      broadcast({
        type: 'comment_created',
        data: { ideaId, comment: newComment, idea: ideaWithComments }
      });
      
      res.status(201).json(newComment);
    } catch (error) {
      console.error('Error creating comment:', error);
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: 'Invalid data', errors: error.errors });
      } else {
        res.status(500).json({ message: 'Failed to create comment' });
      }
    }
  });

  // Update comment
  app.put('/api/comments/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const { content } = req.body;
      
      if (!content || content.trim().length === 0) {
        return res.status(400).json({ message: 'Content is required' });
      }
      
      const updatedComment = await storage.updateComment(id, content.trim());
      
      if (!updatedComment) {
        return res.status(404).json({ message: 'Comment not found' });
      }

      // Broadcast to WebSocket clients
      broadcast({
        type: 'comment_updated',
        data: updatedComment
      });
      
      res.json(updatedComment);
    } catch (error) {
      console.error('Error updating comment:', error);
      res.status(500).json({ message: 'Failed to update comment' });
    }
  });

  // Delete comment
  app.delete('/api/comments/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const success = await storage.deleteComment(id);
      
      if (!success) {
        return res.status(404).json({ message: 'Comment not found' });
      }

      // Broadcast to WebSocket clients
      broadcast({
        type: 'comment_deleted',
        data: { id }
      });
      
      res.json({ message: 'Comment deleted successfully' });
    } catch (error) {
      console.error('Error deleting comment:', error);
      res.status(500).json({ message: 'Failed to delete comment' });
    }
  });

  // Get statistics
  app.get('/api/stats', async (req, res) => {
    try {
      const stats = await storage.getIdeasStats();
      res.json(stats);
    } catch (error) {
      console.error('Error fetching stats:', error);
      res.status(500).json({ message: 'Failed to fetch statistics' });
    }
  });

  const httpServer = createServer(app);

  // Set up WebSocket server
  const wss = new WebSocketServer({ server: httpServer, path: '/ws' });

  wss.on('connection', (ws) => {
    console.log('WebSocket client connected');
    wsClients.add(ws);

    // Send initial stats
    storage.getIdeasStats().then(stats => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify({
          type: 'stats_update',
          data: stats
        }));
      }
    }).catch(console.error);

    ws.on('close', () => {
      console.log('WebSocket client disconnected');
      wsClients.delete(ws);
    });

    ws.on('error', (error) => {
      console.error('WebSocket error:', error);
      wsClients.delete(ws);
    });

    // Handle ping/pong for connection health
    ws.on('ping', () => {
      ws.pong();
    });
  });

  // Broadcast active users count periodically
  setInterval(() => {
    broadcast({
      type: 'active_users',
      data: { count: wsClients.size }
    });
  }, 30000);

  return httpServer;
}
