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
