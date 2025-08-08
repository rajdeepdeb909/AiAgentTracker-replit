import { Router } from "express";
import { z } from "zod";
import { eq, desc, and, gte } from "drizzle-orm";
import { db } from "./db";
import {
  userPresence,
  collaborationActivities,
  collaborationNotifications,
  collaborationSessions,
  insertUserPresenceSchema,
  insertCollaborationActivitySchema,
  insertCollaborationNotificationSchema,
  insertCollaborationSessionSchema,
} from "@shared/collaboration-schema";

const router = Router();

// Get active users on current page
router.get("/presence/:page", async (req, res) => {
  try {
    const { page } = req.params;
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
    
    const activeUsers = await db
      .select()
      .from(userPresence)
      .where(
        and(
          eq(userPresence.currentPage, page),
          eq(userPresence.isActive, true),
          gte(userPresence.lastActivity, fiveMinutesAgo)
        )
      );
    
    res.json(activeUsers);
  } catch (error) {
    console.error("Error fetching presence:", error);
    res.status(500).json({ error: "Failed to fetch user presence" });
  }
});

// Update user presence
router.post("/presence", async (req, res) => {
  try {
    const validatedData = insertUserPresenceSchema.parse(req.body);
    
    // Check if user already has presence record
    const existingPresence = await db
      .select()
      .from(userPresence)
      .where(eq(userPresence.userId, validatedData.userId))
      .limit(1);
    
    if (existingPresence.length > 0) {
      // Update existing presence
      const [updated] = await db
        .update(userPresence)
        .set({
          ...validatedData,
          lastActivity: new Date(),
        })
        .where(eq(userPresence.userId, validatedData.userId))
        .returning();
      
      res.json(updated);
    } else {
      // Create new presence record
      const [created] = await db
        .insert(userPresence)
        .values(validatedData)
        .returning();
      
      res.json(created);
    }
  } catch (error) {
    console.error("Error updating presence:", error);
    res.status(500).json({ error: "Failed to update user presence" });
  }
});

// Remove user presence (logout/disconnect)
router.delete("/presence/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    
    await db
      .update(userPresence)
      .set({ isActive: false })
      .where(eq(userPresence.userId, userId));
    
    res.json({ success: true });
  } catch (error) {
    console.error("Error removing presence:", error);
    res.status(500).json({ error: "Failed to remove user presence" });
  }
});

// Get recent collaboration activities
router.get("/activities", async (req, res) => {
  try {
    const { page, limit = 50 } = req.query;
    
    let query = db
      .select()
      .from(collaborationActivities)
      .orderBy(desc(collaborationActivities.timestamp))
      .limit(Number(limit));
    
    if (page) {
      const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
      // For now, filter in memory until we have proper query builder support
      const activities = await query;
      const filtered = activities.filter(activity => 
        activity.targetEntity === page && 
        activity.timestamp >= oneHourAgo
      );
      return res.json(filtered);
    }
    
    const activities = await query;
    res.json(activities);
  } catch (error) {
    console.error("Error fetching activities:", error);
    res.status(500).json({ error: "Failed to fetch collaboration activities" });
  }
});

// Create collaboration activity
router.post("/activities", async (req, res) => {
  try {
    const validatedData = insertCollaborationActivitySchema.parse(req.body);
    
    const [created] = await db
      .insert(collaborationActivities)
      .values(validatedData)
      .returning();
    
    res.json(created);
  } catch (error) {
    console.error("Error creating activity:", error);
    res.status(500).json({ error: "Failed to create collaboration activity" });
  }
});

// Get user notifications
router.get("/notifications/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const { unreadOnly = false } = req.query;
    
    let query = db
      .select()
      .from(collaborationNotifications)
      .where(eq(collaborationNotifications.recipientId, userId))
      .orderBy(desc(collaborationNotifications.timestamp))
      .limit(100);
    
    if (unreadOnly === 'true') {
      // For now, filter in memory until we have proper query builder support
      const notifications = await query;
      const filtered = notifications.filter(notification => 
        notification.recipientId === userId && 
        !notification.isRead
      );
      return res.json(filtered);
    }
    
    const notifications = await query;
    res.json(notifications);
  } catch (error) {
    console.error("Error fetching notifications:", error);
    res.status(500).json({ error: "Failed to fetch notifications" });
  }
});

// Mark notifications as read
router.patch("/notifications/:userId/read", async (req, res) => {
  try {
    const { userId } = req.params;
    const { notificationIds } = req.body;
    
    if (notificationIds && Array.isArray(notificationIds)) {
      // Mark specific notifications as read
      await db
        .update(collaborationNotifications)
        .set({ isRead: true })
        .where(
          and(
            eq(collaborationNotifications.recipientId, userId),
            // TODO: Add IN clause when available in drizzle
          )
        );
    } else {
      // Mark all notifications as read
      await db
        .update(collaborationNotifications)
        .set({ isRead: true })
        .where(eq(collaborationNotifications.recipientId, userId));
    }
    
    res.json({ success: true });
  } catch (error) {
    console.error("Error marking notifications as read:", error);
    res.status(500).json({ error: "Failed to mark notifications as read" });
  }
});

// Create collaboration session
router.post("/sessions", async (req, res) => {
  try {
    const validatedData = insertCollaborationSessionSchema.parse(req.body);
    
    const [created] = await db
      .insert(collaborationSessions)
      .values(validatedData)
      .returning();
    
    res.json(created);
  } catch (error) {
    console.error("Error creating session:", error);
    res.status(500).json({ error: "Failed to create collaboration session" });
  }
});

// Get active collaboration sessions
router.get("/sessions", async (req, res) => {
  try {
    const { page } = req.query;
    
    let query = db
      .select()
      .from(collaborationSessions)
      .where(eq(collaborationSessions.status, "active"))
      .orderBy(desc(collaborationSessions.startTime));
    
    if (page) {
      // For now, filter in memory until we have proper query builder support
      const sessions = await query;
      const filtered = sessions.filter(session => 
        session.targetPage === page && 
        session.status === "active"
      );
      return res.json(filtered);
    }
    
    const sessions = await query;
    res.json(sessions);
  } catch (error) {
    console.error("Error fetching sessions:", error);
    res.status(500).json({ error: "Failed to fetch collaboration sessions" });
  }
});

// Update collaboration session
router.patch("/sessions/:sessionId", async (req, res) => {
  try {
    const { sessionId } = req.params;
    const updateData = req.body;
    
    const [updated] = await db
      .update(collaborationSessions)
      .set(updateData)
      .where(eq(collaborationSessions.id, Number(sessionId)))
      .returning();
    
    res.json(updated);
  } catch (error) {
    console.error("Error updating session:", error);
    res.status(500).json({ error: "Failed to update collaboration session" });
  }
});

export { router as collaborationRoutes };