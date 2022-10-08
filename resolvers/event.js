import prisma from "lib/prisma";
import langs from "site-settings/site-translations";
import { UserInputError } from "apollo-server-micro";
import { transformEvent } from "helper/transform";
import { isLoggedin } from "middleware/isLoggedin";
import { combineResolvers } from "graphql-resolvers";

export const eventResolver = {
  Query: {
    events: async () => {
      try {
        const events = await prisma.event.findMany({
          include: { creator: true },
        });
        return events.map((event) => transformEvent(event));
      } catch (error) {
        throw error;
      }
    },
    getUserEvents: async (_, { userId }) => {
      try {
        const events = await prisma.event.findMany({
          where: {
            creatorId: Number(userId),
          },
        });
        return events.map((event) => transformEvent(event));
      } catch (error) {
        throw error;
      }
    }
  },
  Mutation: {
    createEvent: combineResolvers(isLoggedin, async (_, args, context) => {
      try {
        const existing = await prisma.event.findUnique({
          where: { title: args.eventInput.title },
        });
        if (existing) throw new UserInputError(langs.ar.eventInputError);
        const event = await prisma.event.create({
          data: {
            title: args.eventInput.title,
            description: args.eventInput.description,
            price: args.eventInput.price,
            date: new Date(args.eventInput.date),
            creatorId: Number(context.user.id),
          },
        });
        return event;
      } catch (error) {
        throw error;
      }
    }),
    deleteEvent: async (_, { eventId }) => {
      try {
        const existing = await prisma.event.findUnique({
          where: { id: Number(eventId) },
        });
        if (!existing)
          throw new UserInputError(langs.ar.eventId, {
            invalidArgs: eventId,
          });
        await prisma.event.delete({ where: { id: Number(eventId) } });
        return prisma.event.findMany();
      } catch (error) {
        throw error;
      }
    },
  }
};