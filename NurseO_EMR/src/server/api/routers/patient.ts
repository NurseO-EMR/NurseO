import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { getPatientByBarCode } from "~/server/database/patientDB/getPatientDB";
import { updateOrderHoldInfo } from "~/server/database/patientDB/updatePatientDB";

export const patientRoute = createTRPCRouter({
  getPatient: publicProcedure.input(z.object({barcode: z.string(), location: z.string(), studentId: z.string() || z.null()})).mutation(async ({input, ctx})=>getPatientByBarCode(ctx.db, input.barcode, input.location, input.studentId)),
  updatePatientHoldInfo: publicProcedure.input(z.object({orderId: z.number(), holdReason: z.string().nullable()})).mutation(async ({input, ctx})=>updateOrderHoldInfo(ctx.db, input.orderId, input.holdReason)),
});
