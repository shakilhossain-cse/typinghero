import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "@/server/api/trpc";

export const categoryRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    try {
      return ctx.prisma.category.findMany({
        where: { userId: ctx.session?.user.id },
        orderBy: { id: "asc" },
      });
    } catch (error) {
      console.log("error", error);
    }
  }),
  create: protectedProcedure
    .input(z.object({ name: z.string() }))
    .mutation(async ({ ctx, input }) => {
      try {
        return ctx.prisma.category.create({
          data: { name: input.name, userId: ctx.session.user.id },
        });
      } catch (error) {
        console.log("error", error);
      }
    }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
});
