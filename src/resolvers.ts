import { Event } from "./models/event";
import { Personality } from "./models/personality";
import { AuthenticationError } from "apollo-server";

interface Context {
  user?: { id: string; role: "user" | "moderator" | "admin" };
}

// Helper function to check roles
const checkRole = (user: any, roles: string[]) => {
  if (!user || !roles.includes(user.role)) {
    throw new AuthenticationError("Access Denied!");
  }
};

export const resolvers = {
  Query: {
    events: async (_: any, __: any, context: Context) => {
      checkRole(context.user, ["user", "moderator", "admin"]); // Only logged-in users can query
      return await Event.find();
    },
    event: async (_: any, { id }: { id: string }, context: Context) => {
      checkRole(context.user, ["user", "moderator", "admin"]);
      return await Event.findById(id);
    },
    personalities: async (_: any, __: any, context: Context) => {
      checkRole(context.user, ["moderator", "admin"]); // Only moderators and admins can query
      return await Personality.find();
    },
    personality: async (_: any, { id }: { id: string }, context: Context) => {
      checkRole(context.user, ["moderator", "admin"]);
      return await Personality.findById(id);
    },
  },

  Mutation: {
    addEvent: async (_: any, { title, year, description }: { title: string; year: number; description: string }, context: Context) => {
      checkRole(context.user, ["moderator", "admin"]);
      const newEvent = new Event({ title, year, description });
      await newEvent.save();
      return newEvent;
    },

    updateEvent: async (_: any, { id, title, year, description }: { id: string; title?: string; year?: number; description?: string }, context: Context) => {
      checkRole(context.user, ["moderator", "admin"]);
      return await Event.findByIdAndUpdate(id, { title, year, description }, { new: true });
    },

    deleteEvent: async (_: any, { id }: { id: string }, context: Context) => {
      checkRole(context.user, ["admin"]);
      return await Event.findByIdAndDelete(id);
    },

    addPersonality: async (_: any, args: any, context: Context) => {
      checkRole(context.user, ["moderator", "admin"]);
      const newPersonality = new Personality(args);
      return await newPersonality.save();
    },

    updatePersonality: async (_: any, { id, ...updates }: any, context: Context) => {
      checkRole(context.user, ["moderator", "admin"]);
      return await Personality.findByIdAndUpdate(id, updates, { new: true });
    },

    deletePersonality: async (_: any, { id }: { id: string }, context: Context) => {
      checkRole(context.user, ["admin"]);
      return await Personality.findByIdAndDelete(id);
    },
  },
};
