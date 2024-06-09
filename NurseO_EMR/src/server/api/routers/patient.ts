import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { getPatient } from "~/server/database/patientDB";

export const patientRoute = createTRPCRouter({
  getPatient: publicProcedure.input(z.object({barcode: z.string(), location: z.string(), studentId: z.string() || z.null()})).mutation(async ({input, ctx})=>getPatient(ctx.db, input.barcode, input.location, input.studentId))
});
