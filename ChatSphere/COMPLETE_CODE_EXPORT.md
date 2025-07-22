# Global Ideas Board - Complete Code Export

This contains all the code files for your Global Ideas Board application.

## package.json
```json
{
  "name": "rest-express",
  "version": "1.0.0",
  "type": "module",
  "license": "MIT",
  "scripts": {
    "dev": "NODE_ENV=development tsx server/index.ts",
    "build": "vite build && esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist",
    "start": "NODE_ENV=production node dist/index.js",
    "check": "tsc",
    "db:push": "drizzle-kit push"
  },
  "dependencies": {
    "@hookform/resolvers": "^3.10.0",
    "@jridgewell/trace-mapping": "^0.3.25",
    "@neondatabase/serverless": "^0.10.4",
    "@radix-ui/react-accordion": "^1.2.4",
    "@radix-ui/react-alert-dialog": "^1.1.7",
    "@radix-ui/react-aspect-ratio": "^1.1.3",
    "@radix-ui/react-avatar": "^1.1.4",
    "@radix-ui/react-checkbox": "^1.1.5",
    "@radix-ui/react-collapsible": "^1.1.4",
    "@radix-ui/react-context-menu": "^2.2.7",
    "@radix-ui/react-dialog": "^1.1.7",
    "@radix-ui/react-dropdown-menu": "^2.1.7",
    "@radix-ui/react-hover-card": "^1.1.7",
    "@radix-ui/react-label": "^2.1.3",
    "@radix-ui/react-menubar": "^1.1.7",
    "@radix-ui/react-navigation-menu": "^1.2.6",
    "@radix-ui/react-popover": "^1.1.7",
    "@radix-ui/react-progress": "^1.1.3",
    "@radix-ui/react-radio-group": "^1.2.4",
    "@radix-ui/react-scroll-area": "^1.2.4",
    "@radix-ui/react-select": "^2.1.7",
    "@radix-ui/react-separator": "^1.1.3",
    "@radix-ui/react-slider": "^1.2.4",
    "@radix-ui/react-slot": "^1.2.0",
    "@radix-ui/react-switch": "^1.1.4",
    "@radix-ui/react-tabs": "^1.1.4",
    "@radix-ui/react-toast": "^1.2.7",
    "@radix-ui/react-toggle": "^1.1.3",
    "@radix-ui/react-toggle-group": "^1.1.3",
    "@radix-ui/react-tooltip": "^1.2.0",
    "@tanstack/react-query": "^5.60.5",
    "@types/multer": "^2.0.0",
    "chart.js": "^4.5.0",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "cmdk": "^1.1.1",
    "connect-pg-simple": "^10.0.0",
    "date-fns": "^3.6.0",
    "drizzle-orm": "^0.39.1",
    "drizzle-zod": "^0.7.0",
    "embla-carousel-react": "^8.6.0",
    "express": "^4.21.2",
    "express-session": "^1.18.1",
    "framer-motion": "^11.13.1",
    "input-otp": "^1.4.2",
    "lucide-react": "^0.453.0",
    "memorystore": "^1.6.7",
    "multer": "^2.0.2",
    "nanoid": "^5.1.5",
    "next-themes": "^0.4.6",
    "passport": "^0.7.0",
    "passport-local": "^1.0.0",
    "react": "^18.3.1",
    "react-day-picker": "^8.10.1",
    "react-dom": "^18.3.1",
    "react-hook-form": "^7.55.0",
    "react-icons": "^5.4.0",
    "react-resizable-panels": "^2.1.7",
    "recharts": "^2.15.2",
    "tailwind-merge": "^2.6.0",
    "tailwindcss-animate": "^1.0.7",
    "tw-animate-css": "^1.2.5",
    "vaul": "^1.1.2",
    "wouter": "^3.3.5",
    "ws": "^8.18.0",
    "zod": "^3.24.2",
    "zod-validation-error": "^3.4.0"
  },
  "devDependencies": {
    "@replit/vite-plugin-cartographer": "^0.2.7",
    "@replit/vite-plugin-runtime-error-modal": "^0.0.3",
    "@tailwindcss/typography": "^0.5.15",
    "@tailwindcss/vite": "^4.1.3",
    "@types/connect-pg-simple": "^7.0.3",
    "@types/express": "4.17.21",
    "@types/express-session": "^1.18.0",
    "@types/node": "20.16.11",
    "@types/passport": "^1.0.16",
    "@types/passport-local": "^1.0.38",
    "@types/react": "^18.3.11",
    "@types/react-dom": "^18.3.1",
    "@types/ws": "^8.5.13",
    "@vitejs/plugin-react": "^4.3.2",
    "autoprefixer": "^10.4.20",
    "drizzle-kit": "^0.30.4",
    "esbuild": "^0.25.0",
    "postcss": "^8.4.47",
    "tailwindcss": "^3.4.17",
    "tsx": "^4.19.1",
    "typescript": "5.6.3",
    "vite": "^5.4.19"
  },
  "optionalDependencies": {
    "bufferutil": "^4.0.8"
  }
}

```

## tsconfig.json
```json
{
  "include": ["client/src/**/*", "shared/**/*", "server/**/*"],
  "exclude": ["node_modules", "build", "dist", "**/*.test.ts"],
  "compilerOptions": {
    "incremental": true,
    "tsBuildInfoFile": "./node_modules/typescript/tsbuildinfo",
    "noEmit": true,
    "module": "ESNext",
    "strict": true,
    "lib": ["esnext", "dom", "dom.iterable"],
    "jsx": "preserve",
    "esModuleInterop": true,
    "skipLibCheck": true,
    "allowImportingTsExtensions": true,
    "moduleResolution": "bundler",
    "baseUrl": ".",
    "types": ["node", "vite/client"],
    "paths": {
      "@/*": ["./client/src/*"],
      "@shared/*": ["./shared/*"]
    }
  }
}

```

## vite.config.ts
```ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";

export default defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    ...(process.env.NODE_ENV !== "production" &&
    process.env.REPL_ID !== undefined
      ? [
          await import("@replit/vite-plugin-cartographer").then((m) =>
            m.cartographer(),
          ),
        ]
      : []),
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets"),
    },
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
  },
  server: {
    fs: {
      strict: true,
      deny: ["**/.*"],
    },
  },
});

```

## tailwind.config.ts
```ts
import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./client/index.html", "./client/src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
        },
        popover: {
          DEFAULT: "var(--popover)",
          foreground: "var(--popover-foreground)",
        },
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
        },
        destructive: {
          DEFAULT: "var(--destructive)",
          foreground: "var(--destructive-foreground)",
        },
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
        chart: {
          "1": "var(--chart-1)",
          "2": "var(--chart-2)",
          "3": "var(--chart-3)",
          "4": "var(--chart-4)",
          "5": "var(--chart-5)",
        },
        sidebar: {
          DEFAULT: "var(--sidebar-background)",
          foreground: "var(--sidebar-foreground)",
          primary: "var(--sidebar-primary)",
          "primary-foreground": "var(--sidebar-primary-foreground)",
          accent: "var(--sidebar-accent)",
          "accent-foreground": "var(--sidebar-accent-foreground)",
          border: "var(--sidebar-border)",
          ring: "var(--sidebar-ring)",
        },
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
} satisfies Config;

```

## postcss.config.js
```js
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}

```

## components.json
```json
{
    "$schema": "https://ui.shadcn.com/schema.json",
    "style": "new-york",
    "rsc": false,
    "tsx": true,
    "tailwind": {
      "config": "tailwind.config.ts",
      "css": "client/src/index.css",
      "baseColor": "neutral",
      "cssVariables": true,
      "prefix": ""
    },
    "aliases": {
      "components": "@/components",
      "utils": "@/lib/utils",
      "ui": "@/components/ui",
      "lib": "@/lib",
      "hooks": "@/hooks"
    }
}
```

## drizzle.config.ts
```ts
import { defineConfig } from "drizzle-kit";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL, ensure the database is provisioned");
}

export default defineConfig({
  out: "./migrations",
  schema: "./shared/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
});

```

## server/index.ts
```ts
import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

(async () => {
  const server = await registerRoutes(app);

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(status).json({ message });
    throw err;
  });

  // importantly only setup vite in development and after
  // setting up all the other routes so the catch-all route
  // doesn't interfere with the other routes
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  // ALWAYS serve the app on the port specified in the environment variable PORT
  // Other ports are firewalled. Default to 5000 if not specified.
  // this serves both the API and the client.
  // It is the only port that is not firewalled.
  const port = parseInt(process.env.PORT || '5000', 10);
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true,
  }, () => {
    log(`serving on port ${port}`);
  });
})();

```

## server/routes.ts
```ts
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

```

## server/storage.ts
```ts
import { ideas, comments, users, type Idea, type InsertIdea, type Comment, type InsertComment, type IdeaWithComments, type User, type InsertUser } from "@shared/schema";
import { db } from "./db";
import { eq, desc, like, and, or, sql } from "drizzle-orm";

export interface IStorage {
  // Ideas
  createIdea(idea: InsertIdea): Promise<Idea>;
  getAllIdeas(): Promise<IdeaWithComments[]>;
  getIdeaById(id: number): Promise<IdeaWithComments | undefined>;
  updateIdea(id: number, idea: Partial<InsertIdea>): Promise<Idea | undefined>;
  deleteIdea(id: number): Promise<boolean>;
  likeIdea(id: number): Promise<Idea | undefined>;
  searchIdeas(query: string): Promise<IdeaWithComments[]>;
  getIdeasByCategory(category: number): Promise<IdeaWithComments[]>;
  getIdeasByStage(stage: number): Promise<IdeaWithComments[]>;
  getIdeasStats(): Promise<{
    total: number;
    today: number;
    week: number;
    byCategory: Record<number, number>;
  }>;

  // Comments
  createComment(comment: InsertComment): Promise<Comment>;
  updateComment(id: number, content: string): Promise<Comment | undefined>;
  deleteComment(id: number): Promise<boolean>;

  // Users (keeping existing interface)
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
}

export class DatabaseStorage implements IStorage {
  // Ideas
  async createIdea(insertIdea: InsertIdea): Promise<Idea> {
    const [idea] = await db
      .insert(ideas)
      .values({
        ...insertIdea,
        tags: insertIdea.tags || [],
      })
      .returning();
    return idea;
  }

  async getAllIdeas(): Promise<IdeaWithComments[]> {
    const result = await db
      .select()
      .from(ideas)
      .leftJoin(comments, eq(comments.ideaId, ideas.id))
      .orderBy(desc(ideas.createdAt));

    // Group comments by idea
    const ideasMap = new Map<number, IdeaWithComments>();
    
    for (const row of result) {
      const idea = row.ideas;
      const comment = row.comments;
      
      if (!ideasMap.has(idea.id)) {
        ideasMap.set(idea.id, {
          ...idea,
          comments: [],
        });
      }
      
      if (comment) {
        ideasMap.get(idea.id)!.comments.push(comment);
      }
    }

    return Array.from(ideasMap.values());
  }

  async getIdeaById(id: number): Promise<IdeaWithComments | undefined> {
    const result = await db
      .select()
      .from(ideas)
      .leftJoin(comments, eq(comments.ideaId, ideas.id))
      .where(eq(ideas.id, id));

    if (result.length === 0) return undefined;

    const idea = result[0].ideas;
    const ideaComments = result
      .filter(row => row.comments)
      .map(row => row.comments!);

    return {
      ...idea,
      comments: ideaComments,
    };
  }

  async updateIdea(id: number, updateData: Partial<InsertIdea>): Promise<Idea | undefined> {
    const [idea] = await db
      .update(ideas)
      .set({
        ...updateData,
        updatedAt: new Date(),
      })
      .where(eq(ideas.id, id))
      .returning();
    return idea || undefined;
  }

  async deleteIdea(id: number): Promise<boolean> {
    const result = await db
      .delete(ideas)
      .where(eq(ideas.id, id))
      .returning();
    return result.length > 0;
  }

  async likeIdea(id: number): Promise<Idea | undefined> {
    const [idea] = await db
      .update(ideas)
      .set({
        likes: sql`${ideas.likes} + 1`,
        updatedAt: new Date(),
      })
      .where(eq(ideas.id, id))
      .returning();
    return idea || undefined;
  }

  async searchIdeas(query: string): Promise<IdeaWithComments[]> {
    const searchTerm = `%${query.toLowerCase()}%`;
    
    const result = await db
      .select()
      .from(ideas)
      .leftJoin(comments, eq(comments.ideaId, ideas.id))
      .where(
        or(
          like(sql`LOWER(${ideas.title})`, searchTerm),
          like(sql`LOWER(${ideas.description})`, searchTerm),
          like(sql`LOWER(${ideas.name})`, searchTerm)
        )
      )
      .orderBy(desc(ideas.createdAt));

    // Group comments by idea
    const ideasMap = new Map<number, IdeaWithComments>();
    
    for (const row of result) {
      const idea = row.ideas;
      const comment = row.comments;
      
      if (!ideasMap.has(idea.id)) {
        ideasMap.set(idea.id, {
          ...idea,
          comments: [],
        });
      }
      
      if (comment) {
        ideasMap.get(idea.id)!.comments.push(comment);
      }
    }

    return Array.from(ideasMap.values());
  }

  async getIdeasByCategory(category: number): Promise<IdeaWithComments[]> {
    const result = await db
      .select()
      .from(ideas)
      .leftJoin(comments, eq(comments.ideaId, ideas.id))
      .where(eq(ideas.category, category))
      .orderBy(desc(ideas.createdAt));

    // Group comments by idea
    const ideasMap = new Map<number, IdeaWithComments>();
    
    for (const row of result) {
      const idea = row.ideas;
      const comment = row.comments;
      
      if (!ideasMap.has(idea.id)) {
        ideasMap.set(idea.id, {
          ...idea,
          comments: [],
        });
      }
      
      if (comment) {
        ideasMap.get(idea.id)!.comments.push(comment);
      }
    }

    return Array.from(ideasMap.values());
  }

  async getIdeasByStage(stage: number): Promise<IdeaWithComments[]> {
    const result = await db
      .select()
      .from(ideas)
      .leftJoin(comments, eq(comments.ideaId, ideas.id))
      .where(eq(ideas.stage, stage))
      .orderBy(desc(ideas.createdAt));

    // Group comments by idea
    const ideasMap = new Map<number, IdeaWithComments>();
    
    for (const row of result) {
      const idea = row.ideas;
      const comment = row.comments;
      
      if (!ideasMap.has(idea.id)) {
        ideasMap.set(idea.id, {
          ...idea,
          comments: [],
        });
      }
      
      if (comment) {
        ideasMap.get(idea.id)!.comments.push(comment);
      }
    }

    return Array.from(ideasMap.values());
  }

  async getIdeasStats(): Promise<{
    total: number;
    today: number;
    week: number;
    byCategory: Record<number, number>;
  }> {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

    const [totalResult] = await db
      .select({ count: sql<number>`count(*)` })
      .from(ideas);

    const [todayResult] = await db
      .select({ count: sql<number>`count(*)` })
      .from(ideas)
      .where(sql`${ideas.createdAt} >= ${today}`);

    const [weekResult] = await db
      .select({ count: sql<number>`count(*)` })
      .from(ideas)
      .where(sql`${ideas.createdAt} >= ${weekAgo}`);

    const categoryResults = await db
      .select({
        category: ideas.category,
        count: sql<number>`count(*)`
      })
      .from(ideas)
      .groupBy(ideas.category);

    const byCategory: Record<number, number> = {};
    categoryResults.forEach(result => {
      byCategory[result.category] = result.count;
    });

    return {
      total: totalResult.count,
      today: todayResult.count,
      week: weekResult.count,
      byCategory,
    };
  }

  // Comments
  async createComment(insertComment: InsertComment): Promise<Comment> {
    const [comment] = await db
      .insert(comments)
      .values(insertComment)
      .returning();
    return comment;
  }

  async updateComment(id: number, content: string): Promise<Comment | undefined> {
    const [comment] = await db
      .update(comments)
      .set({ content })
      .where(eq(comments.id, id))
      .returning();
    return comment || undefined;
  }

  async deleteComment(id: number): Promise<boolean> {
    const result = await db
      .delete(comments)
      .where(eq(comments.id, id))
      .returning();
    return result.length > 0;
  }

  // Users
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }
}

export const storage = new DatabaseStorage();

```

## server/db.ts
```ts
import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import ws from "ws";
import * as schema from "@shared/schema";

neonConfig.webSocketConstructor = ws;

if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL must be set. Did you forget to provision a database?",
  );
}

export const pool = new Pool({ connectionString: process.env.DATABASE_URL });
export const db = drizzle({ client: pool, schema });
```

## server/vite.ts
```ts
import express, { type Express } from "express";
import fs from "fs";
import path from "path";
import { createServer as createViteServer, createLogger } from "vite";
import { type Server } from "http";
import viteConfig from "../vite.config";
import { nanoid } from "nanoid";

const viteLogger = createLogger();

export function log(message: string, source = "express") {
  const formattedTime = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  console.log(`${formattedTime} [${source}] ${message}`);
}

export async function setupVite(app: Express, server: Server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true as const,
  };

  const vite = await createViteServer({
    ...viteConfig,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      },
    },
    server: serverOptions,
    appType: "custom",
  });

  app.use(vite.middlewares);
  app.use("*", async (req, res, next) => {
    const url = req.originalUrl;

    try {
      const clientTemplate = path.resolve(
        import.meta.dirname,
        "..",
        "client",
        "index.html",
      );

      // always reload the index.html file from disk incase it changes
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`,
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e as Error);
      next(e);
    }
  });
}

export function serveStatic(app: Express) {
  const distPath = path.resolve(import.meta.dirname, "public");

  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`,
    );
  }

  app.use(express.static(distPath));

  // fall through to index.html if the file doesn't exist
  app.use("*", (_req, res) => {
    res.sendFile(path.resolve(distPath, "index.html"));
  });
}

```

## shared/schema.ts
```ts
import { pgTable, text, serial, integer, boolean, timestamp, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { relations } from "drizzle-orm";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const ideas = pgTable("ideas", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  name: text("name").notNull(),
  category: integer("category").notNull(), // SDG number 1-17
  stage: integer("stage").notNull().default(0), // 0=concept, 1=prototype, 2=pilot, 3=impact
  imageData: text("image_data"), // base64 encoded image
  tags: json("tags").$type<string[]>().default([]),
  likes: integer("likes").default(0),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const comments = pgTable("comments", {
  id: serial("id").primaryKey(),
  ideaId: integer("idea_id").notNull().references(() => ideas.id, { onDelete: "cascade" }),
  content: text("content").notNull(),
  authorName: text("author_name").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const ideaRelations = relations(ideas, ({ many }) => ({
  comments: many(comments),
}));

export const commentRelations = relations(comments, ({ one }) => ({
  idea: one(ideas, {
    fields: [comments.ideaId],
    references: [ideas.id],
  }),
}));

export const insertIdeaSchema = createInsertSchema(ideas).omit({
  id: true,
  likes: true,
  createdAt: true,
  updatedAt: true,
}).extend({
  tags: z.array(z.string()).optional(),
});

export const insertCommentSchema = createInsertSchema(comments).omit({
  id: true,
  createdAt: true,
});

export type InsertIdea = z.infer<typeof insertIdeaSchema>;
export type Idea = typeof ideas.$inferSelect;
export type InsertComment = z.infer<typeof insertCommentSchema>;
export type Comment = typeof comments.$inferSelect;

export type IdeaWithComments = Idea & {
  comments: Comment[];
};

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

```

## client/index.html
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
    <!-- This is a replit script which adds a banner on the top of the page when opened in development mode outside the replit environment -->
    <script type="text/javascript" src="https://replit.com/public/js/replit-dev-banner.js"></script>
  </body>
</html>
```

## client/src/main.tsx
```tsx
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

createRoot(document.getElementById("root")!).render(<App />);

```

## client/src/App.tsx
```tsx
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/home";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;

```

## client/src/index.css
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --background: hsl(0, 0%, 100%);
  --foreground: hsl(20, 14.3%, 4.1%);
  --muted: hsl(60, 4.8%, 95.9%);
  --muted-foreground: hsl(25, 5.3%, 44.7%);
  --popover: hsl(0, 0%, 100%);
  --popover-foreground: hsl(20, 14.3%, 4.1%);
  --card: hsl(0, 0%, 100%);
  --card-foreground: hsl(20, 14.3%, 4.1%);
  --border: hsl(20, 5.9%, 90%);
  --input: hsl(20, 5.9%, 90%);
  --primary: hsl(207, 90%, 54%);
  --primary-foreground: hsl(211, 100%, 99%);
  --secondary: hsl(60, 4.8%, 95.9%);
  --secondary-foreground: hsl(24, 9.8%, 10%);
  --accent: hsl(60, 4.8%, 95.9%);
  --accent-foreground: hsl(24, 9.8%, 10%);
  --destructive: hsl(0, 84.2%, 60.2%);
  --destructive-foreground: hsl(60, 9.1%, 97.8%);
  --ring: hsl(20, 14.3%, 4.1%);
  --radius: 0.5rem;
  
  --connection-status-online: hsl(142, 76%, 36%);
  --connection-status-offline: hsl(0, 84.2%, 60.2%);
  --connection-status-reconnecting: hsl(38, 92%, 50%);
}

.dark {
  --background: hsl(240, 10%, 3.9%);
  --foreground: hsl(0, 0%, 98%);
  --muted: hsl(240, 3.7%, 15.9%);
  --muted-foreground: hsl(240, 5%, 64.9%);
  --popover: hsl(240, 10%, 3.9%);
  --popover-foreground: hsl(0, 0%, 98%);
  --card: hsl(240, 10%, 3.9%);
  --card-foreground: hsl(0, 0%, 98%);
  --border: hsl(240, 3.7%, 15.9%);
  --input: hsl(240, 3.7%, 15.9%);
  --primary: hsl(207, 90%, 54%);
  --primary-foreground: hsl(211, 100%, 99%);
  --secondary: hsl(240, 3.7%, 15.9%);
  --secondary-foreground: hsl(0, 0%, 98%);
  --accent: hsl(240, 3.7%, 15.9%);
  --accent-foreground: hsl(0, 0%, 98%);
  --destructive: hsl(0, 62.8%, 30.6%);
  --destructive-foreground: hsl(0, 0%, 98%);
  --ring: hsl(240, 4.9%, 83.9%);
}

@layer base {
  * {
    @apply border-border;
  }

  body {
    @apply font-sans antialiased text-foreground;
    background: linear-gradient(45deg, hsl(0, 100%, 50%), hsl(30, 100%, 50%), hsl(60, 100%, 50%), hsl(120, 100%, 50%), hsl(240, 100%, 50%), hsl(270, 50%, 40%), hsl(300, 50%, 50%));
    background-size: 400% 400%;
    animation: rainbow 10s ease infinite;
    transition: background 0.5s, color 0.5s;
    min-height: 100vh;
  }

  body.dark-mode {
    background: linear-gradient(45deg, hsl(0, 50%, 25%), hsl(30, 50%, 25%), hsl(60, 50%, 25%), hsl(120, 50%, 25%), hsl(240, 50%, 25%), hsl(270, 30%, 20%), hsl(300, 30%, 25%));
    background-size: 400% 400%;
    animation: rainbow 10s ease infinite;
    color: hsl(0, 0%, 98%);
  }
}

@keyframes rainbow {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.glass-card {
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

.dark-mode .glass-card {
  background: rgba(30, 30, 30, 0.9);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: hsl(0, 0%, 98%);
}

.idea-card {
  transition: all 0.3s ease;
  border-left: 4px solid transparent;
}

.idea-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
}

.connection-indicator {
  position: fixed;
  top: 20px;
  left: 20px;
  z-index: 50;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  transition: all 0.3s ease;
}

.connection-online {
  background: var(--connection-status-online);
  color: white;
}

.connection-offline {
  background: var(--connection-status-offline);
  color: white;
}

.connection-reconnecting {
  background: var(--connection-status-reconnecting);
  color: white;
}

.pulse-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: currentColor;
  animation: pulse 2s infinite;
}

.progress-stage {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.stage-concept { 
  background: hsl(210, 16%, 93%); 
  color: hsl(217, 19%, 35%); 
}

.stage-prototype { 
  background: hsl(45, 93%, 76%); 
  color: hsl(25, 95%, 53%); 
}

.stage-pilot { 
  background: hsl(213, 94%, 68%); 
  color: hsl(213, 94%, 68%); 
}

.stage-impact { 
  background: hsl(134, 61%, 41%); 
  color: hsl(138, 76%, 97%); 
}

.dark-mode .stage-concept { 
  background: hsl(217, 19%, 35%); 
  color: hsl(210, 16%, 93%); 
}

.dark-mode .stage-prototype { 
  background: hsl(25, 95%, 53%); 
  color: hsl(45, 93%, 76%); 
}

.dark-mode .stage-pilot { 
  background: hsl(213, 94%, 68%); 
  color: hsl(213, 94%, 68%); 
}

.dark-mode .stage-impact { 
  background: hsl(134, 61%, 41%); 
  color: hsl(138, 76%, 97%); 
}

.scrollable-list {
  max-height: 600px;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: hsl(215, 20%, 65%) transparent;
}

.scrollable-list::-webkit-scrollbar {
  width: 6px;
}

.scrollable-list::-webkit-scrollbar-track {
  background: transparent;
}

.scrollable-list::-webkit-scrollbar-thumb {
  background: hsl(215, 20%, 65%);
  border-radius: 3px;
}

.scrollable-list::-webkit-scrollbar-thumb:hover {
  background: hsl(215, 20%, 55%);
}

```

## client/src/pages/home.tsx
```tsx
import { useState, useEffect, useRef } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useWebSocket } from "@/hooks/use-websocket";
import { SDG_CONFIG } from "@/lib/sdg-config";
import { FileUpload } from "@/components/ui/file-upload";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, MessageCircle, DollarSign, Search, Share2, Edit, Trash2, Plus, Filter, X } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface Idea {
  id: number;
  title: string;
  description: string;
  name: string;
  category: number;
  stage: number;
  imageData?: string | null;
  tags: string[];
  likes: number;
  createdAt: string;
  updatedAt: string;
  comments: Comment[];
}

interface Comment {
  id: number;
  ideaId: number;
  content: string;
  authorName: string;
  createdAt: string;
}

interface Stats {
  total: number;
  today: number;
  week: number;
  byCategory: Record<number, number>;
}

const STAGE_NAMES = ['Concept', 'Prototype', 'Pilot', 'Impact'];
const STAGE_COLORS = ['stage-concept', 'stage-prototype', 'stage-pilot', 'stage-impact'];
const STAGE_ICONS = ['💡', '⚙️', '🚀', '📈'];

export default function Home() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [currentFilter, setCurrentFilter] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [stageFilter, setStageFilter] = useState<string>("all");
  const [searchEngine, setSearchEngine] = useState("google");
  const [editingIdea, setEditingIdea] = useState<Idea | null>(null);
  const [showComments, setShowComments] = useState<Record<number, boolean>>({});
  const [newComment, setNewComment] = useState<Record<number, string>>({});
  const [commenterName, setCommenterName] = useState("");
  const [activeUsers, setActiveUsers] = useState(42);
  
  // Form states
  const [formData, setFormData] = useState({
    title: "",
    name: "",
    description: "",
    category: "",
    stage: "0",
    image: null as File | null
  });

  const { toast } = useToast();
  const queryClient = useQueryClient();
  const chartRef = useRef<HTMLCanvasElement>(null);

  // WebSocket connection
  const { isConnected, lastMessage } = useWebSocket('/ws');

  // Load theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
      document.body.classList.add('dark-mode');
    }
  }, []);

  // Handle real-time updates
  useEffect(() => {
    if (lastMessage) {
      try {
        const message = JSON.parse(lastMessage);
        
        switch (message.type) {
          case 'idea_created':
          case 'idea_updated':
          case 'idea_liked':
          case 'comment_created':
            queryClient.invalidateQueries({ queryKey: ['/api/ideas'] });
            queryClient.invalidateQueries({ queryKey: ['/api/stats'] });
            break;
          case 'idea_deleted':
          case 'comment_deleted':
            queryClient.invalidateQueries({ queryKey: ['/api/ideas'] });
            queryClient.invalidateQueries({ queryKey: ['/api/stats'] });
            break;
          case 'stats_update':
            queryClient.setQueryData(['/api/stats'], message.data);
            break;
          case 'active_users':
            setActiveUsers(message.data.count);
            break;
        }
      } catch (error) {
        console.error('Error parsing WebSocket message:', error);
      }
    }
  }, [lastMessage, queryClient]);

  // Fetch ideas
  const { data: ideas = [], isLoading: loadingIdeas } = useQuery<Idea[]>({
    queryKey: ['/api/ideas', { category: currentFilter, search: searchQuery, stage: stageFilter }],
    queryFn: () => {
      const params = new URLSearchParams();
      if (currentFilter) params.append('category', currentFilter.toString());
      if (searchQuery) params.append('search', searchQuery);
      if (stageFilter && stageFilter !== "all") params.append('stage', stageFilter);
      
      return fetch(`/api/ideas?${params}`).then(res => res.json());
    }
  });

  // Fetch stats
  const { data: stats } = useQuery<Stats>({
    queryKey: ['/api/stats'],
  });

  // Create idea mutation
  const createIdeaMutation = useMutation({
    mutationFn: async (data: FormData) => {
      const response = await fetch('/api/ideas', {
        method: 'POST',
        body: data,
      });
      if (!response.ok) throw new Error('Failed to create idea');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/ideas'] });
      queryClient.invalidateQueries({ queryKey: ['/api/stats'] });
      toast({ title: "Success", description: "Idea submitted successfully!" });
      resetForm();
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to submit idea", variant: "destructive" });
    },
  });

  // Update idea mutation
  const updateIdeaMutation = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: FormData }) => {
      const response = await fetch(`/api/ideas/${id}`, {
        method: 'PUT',
        body: data,
      });
      if (!response.ok) throw new Error('Failed to update idea');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/ideas'] });
      toast({ title: "Success", description: "Idea updated successfully!" });
      setEditingIdea(null);
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to update idea", variant: "destructive" });
    },
  });

  // Delete idea mutation
  const deleteIdeaMutation = useMutation({
    mutationFn: async (id: number) => {
      const response = await fetch(`/api/ideas/${id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Failed to delete idea');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/ideas'] });
      queryClient.invalidateQueries({ queryKey: ['/api/stats'] });
      toast({ title: "Success", description: "Idea deleted successfully!" });
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to delete idea", variant: "destructive" });
    },
  });

  // Like idea mutation
  const likeIdeaMutation = useMutation({
    mutationFn: async (id: number) => {
      return apiRequest('POST', `/api/ideas/${id}/like`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/ideas'] });
    },
  });

  // Create comment mutation
  const createCommentMutation = useMutation({
    mutationFn: async ({ ideaId, content, authorName }: { ideaId: number; content: string; authorName: string }) => {
      return apiRequest('POST', `/api/ideas/${ideaId}/comments`, { content, authorName });
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['/api/ideas'] });
      setNewComment(prev => ({ ...prev, [variables.ideaId]: '' }));
      toast({ title: "Success", description: "Comment added successfully!" });
    },
  });

  // Delete comment mutation
  const deleteCommentMutation = useMutation({
    mutationFn: async (commentId: number) => {
      return apiRequest('DELETE', `/api/comments/${commentId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/ideas'] });
      toast({ title: "Success", description: "Comment deleted successfully!" });
    },
  });

  // Initialize chart
  useEffect(() => {
    if (stats && chartRef.current) {
      // Clear any existing chart
      const existingChart = (window as any).heatmapChart;
      if (existingChart) {
        existingChart.destroy();
      }

      const ctx = chartRef.current.getContext('2d');
      if (!ctx) return;

      // Import Chart.js dynamically
      import('chart.js/auto').then((Chart) => {
        const chartData = Array(17).fill(0);
        Object.entries(stats.byCategory).forEach(([category, count]) => {
          const index = parseInt(category) - 1;
          if (index >= 0 && index < 17) {
            chartData[index] = count;
          }
        });

        const chart = new Chart.default(ctx, {
          type: 'bar',
          data: {
            labels: SDG_CONFIG.names.slice(1),
            datasets: [{
              label: 'Number of Ideas',
              data: chartData,
              backgroundColor: [
                '#e11d48', '#dc2626', '#ea580c', '#d97706', '#ca8a04',
                '#65a30d', '#16a34a', '#059669', '#0d9488', '#0891b2',
                '#0284c7', '#2563eb', '#4f46e5', '#7c3aed', '#a21caf',
                '#be185d', '#e11d48'
              ],
              borderColor: 'rgba(255, 255, 255, 0.1)',
              borderWidth: 1,
              borderRadius: 4
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: { display: false },
              tooltip: {
                callbacks: {
                  title: function(context) {
                    return `SDG ${context[0].dataIndex + 1}: ${context[0].label}`;
                  }
                }
              }
            },
            scales: {
              x: {
                ticks: {
                  maxRotation: 45,
                  font: { size: 10 }
                }
              },
              y: {
                beginAtZero: true,
                ticks: { precision: 0 }
              }
            },
            onClick: (event, elements) => {
              if (elements.length > 0) {
                const sdgNumber = elements[0].index + 1;
                filterBySDG(sdgNumber);
              }
            }
          }
        });

        (window as any).heatmapChart = chart;
      });
    }
  }, [stats]);

  const toggleTheme = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    
    if (newDarkMode) {
      document.body.classList.add('dark-mode');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove('dark-mode');
      localStorage.setItem('theme', 'light');
    }
    
    toast({ title: "Theme Changed", description: `Switched to ${newDarkMode ? 'dark' : 'light'} mode` });
  };

  const resetForm = () => {
    setFormData({
      title: "",
      name: "",
      description: "",
      category: "",
      stage: "0",
      image: null
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.name || !formData.description || !formData.category) {
      toast({ title: "Error", description: "Please fill in all required fields", variant: "destructive" });
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append('title', formData.title);
    formDataToSend.append('name', formData.name);
    formDataToSend.append('description', formData.description);
    formDataToSend.append('category', formData.category);
    formDataToSend.append('stage', formData.stage);
    
    if (formData.image) {
      formDataToSend.append('image', formData.image);
    }

    createIdeaMutation.mutate(formDataToSend);
  };

  const handleEdit = (idea: Idea) => {
    setEditingIdea(idea);
  };

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingIdea) return;

    const formDataToSend = new FormData();
    formDataToSend.append('title', editingIdea.title);
    formDataToSend.append('description', editingIdea.description);
    formDataToSend.append('category', editingIdea.category.toString());
    formDataToSend.append('stage', editingIdea.stage.toString());

    updateIdeaMutation.mutate({ id: editingIdea.id, data: formDataToSend });
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this idea?')) {
      deleteIdeaMutation.mutate(id);
    }
  };

  const filterBySDG = (sdgNumber: number) => {
    if (currentFilter === sdgNumber) {
      setCurrentFilter(null);
    } else {
      setCurrentFilter(sdgNumber);
    }
  };

  const clearFilter = () => {
    setCurrentFilter(null);
    setSearchQuery("");
    setStageFilter("all");
  };

  const toggleComments = (ideaId: number) => {
    setShowComments(prev => ({
      ...prev,
      [ideaId]: !prev[ideaId]
    }));
  };

  const handleAddComment = (ideaId: number) => {
    const content = newComment[ideaId]?.trim();
    if (!content || !commenterName.trim()) {
      toast({ title: "Error", description: "Please enter your name and comment", variant: "destructive" });
      return;
    }

    createCommentMutation.mutate({
      ideaId,
      content,
      authorName: commenterName.trim()
    });
  };

  const searchOnline = (idea: Idea) => {
    const query = encodeURIComponent(`${idea.title} ${idea.description}`);
    let url = '';
    
    switch(searchEngine) {
      case 'google':
        url = `https://www.google.com/search?q=${query}`;
        break;
      case 'bing':
        url = `https://www.bing.com/search?q=${query}`;
        break;
      case 'duckduckgo':
        url = `https://duckduckgo.com/?q=${query}`;
        break;
    }
    
    window.open(url, '_blank');
  };

  const searchFunding = (idea: Idea) => {
    const query = encodeURIComponent(`${idea.title} funding grants`);
    let url = '';
    
    switch(searchEngine) {
      case 'google':
        url = `https://www.google.com/search?q=${query}`;
        break;
      case 'bing':
        url = `https://www.bing.com/search?q=${query}`;
        break;
      case 'duckduckgo':
        url = `https://duckduckgo.com/?q=${query}`;
        break;
    }
    
    window.open(url, '_blank');
  };

  const shareIdea = async (idea: Idea) => {
    if (navigator.share) {
      await navigator.share({
        title: idea.title,
        text: idea.description,
        url: window.location.href
      });
    } else {
      await navigator.clipboard.writeText(window.location.href);
      toast({ title: "Success", description: "Link copied to clipboard!" });
    }
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);
    
    if (minutes < 1) return 'just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  return (
    <div className="min-h-screen">
      {/* Connection Status */}
      <div className={`connection-indicator ${isConnected ? 'connection-online' : 'connection-offline'}`}>
        <div className="pulse-dot"></div>
        <span>{isConnected ? 'Connected' : 'Disconnected'}</span>
      </div>

      {/* Theme Toggle */}
      <div className="fixed top-5 right-5 z-50">
        <Button
          variant="outline"
          size="sm"
          onClick={toggleTheme}
          className="text-white border-white hover:bg-white hover:text-black"
        >
          {isDarkMode ? '☀️' : '🌙'}
        </Button>
      </div>

      <div className="container py-5">
        {/* Header */}
        <div className="text-center mb-5">
          <h1 className="text-6xl font-bold text-white mb-3" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}>
            Let's Chat Ideas – Global Board 🌍
          </h1>
          <p className="text-xl text-white mb-4" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.3)' }}>
            Collaborate on sustainable solutions for the UN Sustainable Development Goals
          </p>
          <div className="flex justify-center items-center gap-4 mt-3">
            <Badge variant="secondary" className="bg-white text-black">
              <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
              {activeUsers} online
            </Badge>
            <Badge variant="secondary" className="bg-white text-black">
              💡 {stats?.total || 0} ideas shared
            </Badge>
          </div>
        </div>

        {/* Idea Submission Form */}
        <Card className="glass-card mb-4">
          <CardContent className="p-6">
            <h4 className="text-xl font-semibold mb-4 flex items-center">
              💡 Submit Your Idea
            </h4>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="title">Idea Title *</Label>
                  <Input
                    id="title"
                    placeholder="Enter your idea title"
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="name">Your Name *</Label>
                  <Input
                    id="name"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  placeholder="Describe your idea in detail..."
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  required
                />
                <div className="flex justify-between text-sm text-muted-foreground mt-1">
                  <span>Minimum 10 characters</span>
                  <span>{formData.description.length}/1000</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="category">SDG Category *</Label>
                  <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select SDG Category" />
                    </SelectTrigger>
                    <SelectContent>
                      {SDG_CONFIG.names.slice(1).map((name, index) => (
                        <SelectItem key={index + 1} value={(index + 1).toString()}>
                          SDG {index + 1} - {name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="stage">Development Stage</Label>
                  <Select value={formData.stage} onValueChange={(value) => setFormData(prev => ({ ...prev, stage: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {STAGE_NAMES.map((stage, index) => (
                        <SelectItem key={index} value={index.toString()}>
                          {STAGE_ICONS[index]} {stage}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="image">Idea Image (Optional)</Label>
                <FileUpload
                  onFileChange={(file) => setFormData(prev => ({ ...prev, image: file }))}
                  accept="image/*"
                  maxSize={5 * 1024 * 1024}
                />
                <p className="text-sm text-muted-foreground mt-1">
                  Maximum file size: 5MB. Supported formats: JPG, PNG, GIF
                </p>
              </div>

              <div className="flex gap-2">
                <Button 
                  type="submit" 
                  className="bg-green-600 hover:bg-green-700"
                  disabled={createIdeaMutation.isPending}
                >
                  {createIdeaMutation.isPending ? 'Submitting...' : '📤 Post Idea'}
                </Button>
                <Button type="button" variant="outline" onClick={resetForm}>
                  ✖️ Clear
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* SDG Carousel */}
        <Card className="glass-card mb-4">
          <CardContent className="p-6">
            <h5 className="text-lg font-semibold mb-3 flex items-center">
              <Filter className="mr-2 h-5 w-5" />
              Filter by SDG Category
            </h5>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {SDG_CONFIG.names.slice(1).map((name, index) => {
                const sdgNumber = index + 1;
                const isActive = currentFilter === sdgNumber;
                return (
                  <div
                    key={sdgNumber}
                    className={`relative cursor-pointer transition-all ${isActive ? 'ring-2 ring-blue-500' : ''}`}
                    onClick={() => filterBySDG(sdgNumber)}
                  >
                    <img
                      src={SDG_CONFIG.icons[sdgNumber]}
                      alt={name}
                      className="w-full h-20 object-cover rounded-lg hover:scale-105 transition-transform"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity rounded-lg">
                      <span className="text-white text-xs font-semibold text-center px-1">
                        SDG {sdgNumber}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="text-center mt-3">
              <Button variant="outline" size="sm" onClick={clearFilter}>
                <X className="mr-1 h-4 w-4" />
                Clear Filter
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Analytics Dashboard */}
        <Card className="glass-card mb-4">
          <CardContent className="p-6">
            <h5 className="text-lg font-semibold mb-3 flex items-center">
              📊 Ideas Distribution by SDG
            </h5>
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
              <div className="lg:col-span-3">
                <canvas ref={chartRef} style={{ maxHeight: '300px' }}></canvas>
              </div>
              <div className="grid grid-cols-2 lg:grid-cols-1 gap-2">
                <Card className="bg-blue-500 text-white">
                  <CardContent className="p-3 text-center">
                    <div className="text-2xl font-bold">{stats?.total || 0}</div>
                    <div className="text-sm">Total Ideas</div>
                  </CardContent>
                </Card>
                <Card className="bg-green-500 text-white">
                  <CardContent className="p-3 text-center">
                    <div className="text-2xl font-bold">{stats?.today || 0}</div>
                    <div className="text-sm">Today</div>
                  </CardContent>
                </Card>
                <Card className="bg-indigo-500 text-white">
                  <CardContent className="p-3 text-center">
                    <div className="text-2xl font-bold">{stats?.week || 0}</div>
                    <div className="text-sm">This Week</div>
                  </CardContent>
                </Card>
                <Card className="bg-orange-500 text-white">
                  <CardContent className="p-3 text-center">
                    <div className="text-2xl font-bold">{activeUsers}</div>
                    <div className="text-sm">Active Now</div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Search and Filters */}
        <Card className="glass-card mb-4">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <div className="md:col-span-2">
                <Label htmlFor="search">Search Ideas</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="search"
                    placeholder="Search by title, description, or tags..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="sort">Sort By</Label>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest First</SelectItem>
                    <SelectItem value="oldest">Oldest First</SelectItem>
                    <SelectItem value="popular">Most Popular</SelectItem>
                    <SelectItem value="comments">Most Comments</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="stage-filter">Filter by Stage</Label>
                <Select value={stageFilter} onValueChange={setStageFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Stages" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Stages</SelectItem>
                    {STAGE_NAMES.map((stage, index) => (
                      <SelectItem key={index} value={index.toString()}>
                        {stage}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="search-engine">Search Engine</Label>
                <Select value={searchEngine} onValueChange={setSearchEngine}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="google">Google</SelectItem>
                    <SelectItem value="bing">Bing</SelectItem>
                    <SelectItem value="duckduckgo">DuckDuckGo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Ideas List */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-3">
            <h5 className="text-lg font-semibold text-white" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.3)' }}>
              📝 Ideas ({ideas.length})
            </h5>
            <Badge variant="secondary" className="bg-white text-black">
              ⚡ Live Updates
            </Badge>
          </div>

          {loadingIdeas ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="glass-card">
                  <CardContent className="p-6">
                    <div className="animate-pulse">
                      <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
                      <div className="h-3 bg-muted rounded w-1/2 mb-3"></div>
                      <div className="h-16 bg-muted rounded mb-3"></div>
                      <div className="flex gap-2">
                        <div className="h-8 bg-muted rounded w-16"></div>
                        <div className="h-8 bg-muted rounded w-16"></div>
                        <div className="h-8 bg-muted rounded w-16"></div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : ideas.length === 0 ? (
            <Card className="glass-card">
              <CardContent className="p-12 text-center">
                <div className="text-6xl mb-4">💡</div>
                <h5 className="text-xl mb-2">No ideas found</h5>
                <p className="text-muted-foreground">
                  Be the first to share an idea or adjust your filters.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="scrollable-list space-y-4">
              {ideas.map((idea) => (
                <Card key={idea.id} className="glass-card idea-card" style={{ borderLeftColor: `hsl(${(idea.category - 1) * 20}, 70%, 50%)` }}>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center">
                        <img
                          src={SDG_CONFIG.icons[idea.category]}
                          alt={`SDG ${idea.category}`}
                          className="w-10 h-10 rounded mr-3 object-cover"
                        />
                        <div>
                          <h6 className="font-semibold mb-1">{idea.title}</h6>
                          <small className="text-muted-foreground">
                            by {idea.name} • {formatTimeAgo(idea.createdAt)}
                          </small>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={`progress-stage ${STAGE_COLORS[idea.stage]}`}>
                          {STAGE_ICONS[idea.stage]} {STAGE_NAMES[idea.stage]}
                        </Badge>
                        <div className="relative">
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            ⋮
                          </Button>
                        </div>
                      </div>
                    </div>

                    <p className="mb-3">{idea.description}</p>

                    {idea.imageData && (
                      <img
                        src={idea.imageData}
                        alt="Idea"
                        className="w-full max-h-48 object-cover rounded-lg mb-3"
                      />
                    )}

                    {/* Progress visualization */}
                    <div className="mb-3">
                      <div className="flex justify-between items-center mb-1">
                        <small className="text-muted-foreground">Development Progress</small>
                        <small className="text-muted-foreground">{Math.round((idea.stage + 1) * 25)}%</small>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all"
                          style={{ width: `${(idea.stage + 1) * 25}%` }}
                        ></div>
                      </div>
                    </div>

                    {idea.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-3">
                        {idea.tags.map((tag, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}

                    <div className="flex justify-between items-center">
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => likeIdeaMutation.mutate(idea.id)}
                          className="text-red-500 hover:text-red-600"
                        >
                          <Heart className="mr-1 h-4 w-4" />
                          {idea.likes}
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => toggleComments(idea.id)}
                        >
                          <MessageCircle className="mr-1 h-4 w-4" />
                          {idea.comments.length}
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => searchFunding(idea)}
                        >
                          <DollarSign className="mr-1 h-4 w-4" />
                          Funding
                        </Button>
                      </div>
                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => searchOnline(idea)}
                          title="Search online"
                        >
                          <Search className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => shareIdea(idea)}
                          title="Share idea"
                        >
                          <Share2 className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEdit(idea)}
                          title="Edit idea"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(idea.id)}
                          title="Delete idea"
                          className="text-red-500 hover:text-red-600"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    {/* Comments section */}
                    {showComments[idea.id] && (
                      <div className="mt-4 pt-4 border-t space-y-3">
                        {idea.comments.map((comment) => (
                          <div key={comment.id} className="flex items-start gap-2">
                            <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-semibold">
                              {comment.authorName.charAt(0).toUpperCase()}
                            </div>
                            <div className="flex-1">
                              <div className="bg-muted rounded-lg p-3">
                                <div className="font-semibold text-sm">{comment.authorName}</div>
                                <p className="text-sm">{comment.content}</p>
                              </div>
                              <small className="text-muted-foreground ml-1">
                                {formatTimeAgo(comment.createdAt)}
                              </small>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => deleteCommentMutation.mutate(comment.id)}
                              className="text-red-500 hover:text-red-600"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                        
                        <div className="flex gap-2">
                          <Input
                            placeholder="Your name"
                            value={commenterName}
                            onChange={(e) => setCommenterName(e.target.value)}
                            className="w-32"
                          />
                          <Input
                            placeholder="Add a comment..."
                            value={newComment[idea.id] || ''}
                            onChange={(e) => setNewComment(prev => ({ ...prev, [idea.id]: e.target.value }))}
                            onKeyPress={(e) => {
                              if (e.key === 'Enter') {
                                handleAddComment(idea.id);
                              }
                            }}
                          />
                          <Button
                            size="sm"
                            onClick={() => handleAddComment(idea.id)}
                            disabled={createCommentMutation.isPending}
                          >
                            📤
                          </Button>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Edit Idea Modal */}
        <Dialog open={!!editingIdea} onOpenChange={() => setEditingIdea(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Edit Idea</DialogTitle>
            </DialogHeader>
            {editingIdea && (
              <form onSubmit={handleUpdate} className="space-y-4">
                <div>
                  <Label htmlFor="edit-title">Title</Label>
                  <Input
                    id="edit-title"
                    value={editingIdea.title}
                    onChange={(e) => setEditingIdea(prev => prev ? { ...prev, title: e.target.value } : null)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="edit-description">Description</Label>
                  <Textarea
                    id="edit-description"
                    rows={4}
                    value={editingIdea.description}
                    onChange={(e) => setEditingIdea(prev => prev ? { ...prev, description: e.target.value } : null)}
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="edit-category">SDG Category</Label>
                    <Select 
                      value={editingIdea.category.toString()} 
                      onValueChange={(value) => setEditingIdea(prev => prev ? { ...prev, category: parseInt(value) } : null)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {SDG_CONFIG.names.slice(1).map((name, index) => (
                          <SelectItem key={index + 1} value={(index + 1).toString()}>
                            SDG {index + 1} - {name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="edit-stage">Stage</Label>
                    <Select 
                      value={editingIdea.stage.toString()} 
                      onValueChange={(value) => setEditingIdea(prev => prev ? { ...prev, stage: parseInt(value) } : null)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {STAGE_NAMES.map((stage, index) => (
                          <SelectItem key={index} value={index.toString()}>
                            {STAGE_ICONS[index]} {stage}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <Button type="button" variant="outline" onClick={() => setEditingIdea(null)}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={updateIdeaMutation.isPending}>
                    {updateIdeaMutation.isPending ? 'Saving...' : 'Save Changes'}
                  </Button>
                </div>
              </form>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

```

## client/src/pages/not-found.tsx
```tsx
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md mx-4">
        <CardContent className="pt-6">
          <div className="flex mb-4 gap-2">
            <AlertCircle className="h-8 w-8 text-red-500" />
            <h1 className="text-2xl font-bold text-gray-900">404 Page Not Found</h1>
          </div>

          <p className="mt-4 text-sm text-gray-600">
            Did you forget to add the page to the router?
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

```

## client/src/hooks/use-mobile.tsx
```tsx
import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    mql.addEventListener("change", onChange)
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    return () => mql.removeEventListener("change", onChange)
  }, [])

  return !!isMobile
}

```

## client/src/hooks/use-toast.ts
```ts
import * as React from "react"

import type {
  ToastActionElement,
  ToastProps,
} from "@/components/ui/toast"

const TOAST_LIMIT = 1
const TOAST_REMOVE_DELAY = 1000000

type ToasterToast = ToastProps & {
  id: string
  title?: React.ReactNode
  description?: React.ReactNode
  action?: ToastActionElement
}

const actionTypes = {
  ADD_TOAST: "ADD_TOAST",
  UPDATE_TOAST: "UPDATE_TOAST",
  DISMISS_TOAST: "DISMISS_TOAST",
  REMOVE_TOAST: "REMOVE_TOAST",
} as const

let count = 0

function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER
  return count.toString()
}

type ActionType = typeof actionTypes

type Action =
  | {
      type: ActionType["ADD_TOAST"]
      toast: ToasterToast
    }
  | {
      type: ActionType["UPDATE_TOAST"]
      toast: Partial<ToasterToast>
    }
  | {
      type: ActionType["DISMISS_TOAST"]
      toastId?: ToasterToast["id"]
    }
  | {
      type: ActionType["REMOVE_TOAST"]
      toastId?: ToasterToast["id"]
    }

interface State {
  toasts: ToasterToast[]
}

const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>()

const addToRemoveQueue = (toastId: string) => {
  if (toastTimeouts.has(toastId)) {
    return
  }

  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId)
    dispatch({
      type: "REMOVE_TOAST",
      toastId: toastId,
    })
  }, TOAST_REMOVE_DELAY)

  toastTimeouts.set(toastId, timeout)
}

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "ADD_TOAST":
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
      }

    case "UPDATE_TOAST":
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === action.toast.id ? { ...t, ...action.toast } : t
        ),
      }

    case "DISMISS_TOAST": {
      const { toastId } = action

      // ! Side effects ! - This could be extracted into a dismissToast() action,
      // but I'll keep it here for simplicity
      if (toastId) {
        addToRemoveQueue(toastId)
      } else {
        state.toasts.forEach((toast) => {
          addToRemoveQueue(toast.id)
        })
      }

      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === toastId || toastId === undefined
            ? {
                ...t,
                open: false,
              }
            : t
        ),
      }
    }
    case "REMOVE_TOAST":
      if (action.toastId === undefined) {
        return {
          ...state,
          toasts: [],
        }
      }
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId),
      }
  }
}

const listeners: Array<(state: State) => void> = []

let memoryState: State = { toasts: [] }

function dispatch(action: Action) {
  memoryState = reducer(memoryState, action)
  listeners.forEach((listener) => {
    listener(memoryState)
  })
}

type Toast = Omit<ToasterToast, "id">

function toast({ ...props }: Toast) {
  const id = genId()

  const update = (props: ToasterToast) =>
    dispatch({
      type: "UPDATE_TOAST",
      toast: { ...props, id },
    })
  const dismiss = () => dispatch({ type: "DISMISS_TOAST", toastId: id })

  dispatch({
    type: "ADD_TOAST",
    toast: {
      ...props,
      id,
      open: true,
      onOpenChange: (open) => {
        if (!open) dismiss()
      },
    },
  })

  return {
    id: id,
    dismiss,
    update,
  }
}

function useToast() {
  const [state, setState] = React.useState<State>(memoryState)

  React.useEffect(() => {
    listeners.push(setState)
    return () => {
      const index = listeners.indexOf(setState)
      if (index > -1) {
        listeners.splice(index, 1)
      }
    }
  }, [state])

  return {
    ...state,
    toast,
    dismiss: (toastId?: string) => dispatch({ type: "DISMISS_TOAST", toastId }),
  }
}

export { useToast, toast }

```

## client/src/hooks/use-websocket.tsx
```tsx
import { useState, useEffect, useRef } from "react";

interface UseWebSocketReturn {
  isConnected: boolean;
  lastMessage: string | null;
  sendMessage: (message: string) => void;
}

export function useWebSocket(path: string): UseWebSocketReturn {
  const [isConnected, setIsConnected] = useState(false);
  const [lastMessage, setLastMessage] = useState<string | null>(null);
  const socketRef = useRef<WebSocket | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const reconnectAttempts = useRef(0);
  const maxReconnectAttempts = 5;
  const reconnectInterval = 3000;

  const connect = () => {
    try {
      const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
      const wsUrl = `${protocol}//${window.location.host}${path}`;
      
      socketRef.current = new WebSocket(wsUrl);

      socketRef.current.onopen = () => {
        console.log("WebSocket connected");
        setIsConnected(true);
        reconnectAttempts.current = 0;
      };

      socketRef.current.onmessage = (event) => {
        setLastMessage(event.data);
      };

      socketRef.current.onclose = () => {
        console.log("WebSocket disconnected");
        setIsConnected(false);
        
        // Attempt to reconnect
        if (reconnectAttempts.current < maxReconnectAttempts) {
          reconnectAttempts.current++;
          console.log(`Attempting to reconnect (${reconnectAttempts.current}/${maxReconnectAttempts})...`);
          
          reconnectTimeoutRef.current = setTimeout(() => {
            connect();
          }, reconnectInterval);
        }
      };

      socketRef.current.onerror = (error) => {
        console.error("WebSocket error:", error);
        setIsConnected(false);
      };
    } catch (error) {
      console.error("Failed to create WebSocket connection:", error);
      setIsConnected(false);
    }
  };

  const sendMessage = (message: string) => {
    if (socketRef.current?.readyState === WebSocket.OPEN) {
      socketRef.current.send(message);
    } else {
      console.warn("WebSocket is not connected");
    }
  };

  useEffect(() => {
    connect();

    return () => {
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
      
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, [path]);

  return {
    isConnected,
    lastMessage,
    sendMessage,
  };
}

```

## client/src/lib/utils.ts
```ts
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

```

## client/src/lib/queryClient.ts
```ts
import { QueryClient, QueryFunction } from "@tanstack/react-query";

async function throwIfResNotOk(res: Response) {
  if (!res.ok) {
    const text = (await res.text()) || res.statusText;
    throw new Error(`${res.status}: ${text}`);
  }
}

export async function apiRequest(
  method: string,
  url: string,
  data?: unknown | undefined,
): Promise<Response> {
  const res = await fetch(url, {
    method,
    headers: data ? { "Content-Type": "application/json" } : {},
    body: data ? JSON.stringify(data) : undefined,
    credentials: "include",
  });

  await throwIfResNotOk(res);
  return res;
}

type UnauthorizedBehavior = "returnNull" | "throw";
export const getQueryFn: <T>(options: {
  on401: UnauthorizedBehavior;
}) => QueryFunction<T> =
  ({ on401: unauthorizedBehavior }) =>
  async ({ queryKey }) => {
    const res = await fetch(queryKey.join("/") as string, {
      credentials: "include",
    });

    if (unauthorizedBehavior === "returnNull" && res.status === 401) {
      return null;
    }

    await throwIfResNotOk(res);
    return await res.json();
  };

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: getQueryFn({ on401: "throw" }),
      refetchInterval: false,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
});

```

## client/src/lib/sdg-config.ts
```ts
export const SDG_CONFIG = {
  names: ['', 
    'No Poverty', 'Zero Hunger', 'Good Health and Well-being', 'Quality Education', 'Gender Equality', 
    'Clean Water and Sanitation', 'Affordable and Clean Energy', 'Decent Work and Economic Growth', 
    'Industry, Innovation and Infrastructure', 'Reduced Inequality', 'Sustainable Cities and Communities', 
    'Responsible Consumption and Production', 'Climate Action', 'Life Below Water', 'Life on Land', 
    'Peace, Justice and Strong Institutions', 'Partnerships for the Goals'
  ],
  icons: {} as Record<number, string>,
  descriptions: {
    1: "End poverty in all its forms everywhere",
    2: "End hunger, achieve food security and improved nutrition and promote sustainable agriculture",
    3: "Ensure healthy lives and promote well-being for all at all ages",
    4: "Ensure inclusive and equitable quality education and promote lifelong learning opportunities for all",
    5: "Achieve gender equality and empower all women and girls",
    6: "Ensure availability and sustainable management of water and sanitation for all",
    7: "Ensure access to affordable, reliable, sustainable and modern energy for all",
    8: "Promote sustained, inclusive and sustainable economic growth, full and productive employment and decent work for all",
    9: "Build resilient infrastructure, promote inclusive and sustainable industrialization and foster innovation",
    10: "Reduce inequality within and among countries",
    11: "Make cities and human settlements inclusive, safe, resilient and sustainable",
    12: "Ensure sustainable consumption and production patterns",
    13: "Take urgent action to combat climate change and its impacts",
    14: "Conserve and sustainably use the oceans, seas and marine resources for sustainable development",
    15: "Protect, restore and promote sustainable use of terrestrial ecosystems, sustainably manage forests, combat desertification, and halt and reverse land degradation and halt biodiversity loss",
    16: "Promote peaceful and inclusive societies for sustainable development, provide access to justice for all and build effective, accountable and inclusive institutions at all levels",
    17: "Strengthen the means of implementation and revitalize the global partnership for sustainable development"
  } as Record<number, string>
};

// Initialize SDG icons
for (let i = 1; i <= 17; i++) {
  SDG_CONFIG.icons[i] = `https://sdgs.un.org/sites/default/files/goals/E_SDG_Icons-${String(i).padStart(2,'0')}.jpg`;
}

```

