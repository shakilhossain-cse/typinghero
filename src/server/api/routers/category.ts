import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";

export const categoryRouter = createTRPCRouter({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.category.findMany({
      where: { userId: ctx.session.user.id },
      orderBy: { id: "asc" },
    });
  }),
  getSelected: protectedProcedure.query(async ({ ctx }) => {
    const user = await ctx.prisma.user.findUnique({
      where: { id: ctx.session.user.id },
    });
    if (!user?.selectedCategoryId) return null;
    const selectedCategoryId = user.selectedCategoryId;
    return await ctx.prisma.category.findUnique({
      where: { id: selectedCategoryId },
    });
  }),
  create: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        fragments: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.category.create({
        data: {
          name: input.name,
          fragments: input.fragments,
          userId: ctx.session.user.id,
        },
      });
    }),
  update: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        fragments: z.string(),
        categoryId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.category.update({
        where: { id: input.categoryId },
        data: { name: input.name, fragments: input.fragments },
      });
    }),
  select: protectedProcedure
    .input(z.object({ categoryId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.user.update({
        where: { id: ctx.session.user.id },
        data: { selectedCategoryId: input.categoryId },
      });
    }),
});
