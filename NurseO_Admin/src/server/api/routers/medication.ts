import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc";
import { getAllMeds } from "~/server/database/medicationDB";


export const medicationRouter = createTRPCRouter({
  getAllMeds: protectedProcedure.query(async ({ ctx }) => getAllMeds(ctx.db)),
  
});
