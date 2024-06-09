import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { getMedicationById } from "~/server/database/medsDB";

export const medicationRoute = createTRPCRouter({
  getMedicationById: publicProcedure.input(z.object({medId: z.number(), locationId: z.number()})).query(async ({input, ctx})=>getMedicationById(ctx.db, input.medId, input.locationId))
});
