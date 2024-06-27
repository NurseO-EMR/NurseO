import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc";
import { deleteMed, getAllMeds, getAllMedsWithLocationCount } from "~/server/database/medicationDB";


export const medicationRouter = createTRPCRouter({
  getAllMeds: protectedProcedure.query(async ({ ctx }) => await getAllMeds(ctx.db)),
  getAllMedsWithLocationCount: protectedProcedure.query(async ({ctx})=> await getAllMedsWithLocationCount(ctx.db)),
  deleteMed: protectedProcedure.input(z.object({id: z.number()})).mutation(async ({input, ctx})=> await deleteMed(ctx.db, input.id))
  
});
