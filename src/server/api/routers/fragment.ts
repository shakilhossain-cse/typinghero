import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "@/server/api/trpc";
import { log } from "console";

export const fragmentRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    try {
      return await ctx.prisma.fragment.findMany({
        where: { userId: ctx.session?.user.id },
      });
    } catch (error) {
      log("fragment", error);
    }
  }),
  create: protectedProcedure
    .input(
      z.object({ text: z.string(), name: z.string(), categoryId: z.string() })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        return ctx.prisma.fragment.create({
          data: {
            text: input.text,
            name: input.name,
            categoryId: input.categoryId,
            userId: ctx.session.user.id,
          },
        });
      } catch (error) {
        log("fragment", error);
      }
    }),
});
