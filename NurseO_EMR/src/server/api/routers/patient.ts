import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { getPatientByBarCode } from "~/server/database/patientDB/getPatientDB";
import { addNote, updateOrderHoldInfo } from "~/server/database/patientDB/updatePatientDB";

export const patientRoute = createTRPCRouter({
  getPatient: publicProcedure.input(z.object({barcode: z.string(), location: z.string(), studentId: z.string() || z.null()})).mutation(async ({input, ctx})=>getPatientByBarCode(ctx.db, input.barcode, input.location, input.studentId)),
  updatePatientHoldInfo: publicProcedure.input(z.object({orderId: z.number(), holdReason: z.string().nullable()})).mutation(async ({input, ctx})=>updateOrderHoldInfo(ctx.db, input.orderId, input.holdReason)),
  addNote: publicProcedure.input(z.object({patientId: z.number(), date: z.string(), reportName: z.string(), reportType: z.string(), note: z.string()})).mutation(async ({input, ctx})=>addNote(ctx.db, input.patientId, input.date, input.reportName, input.reportType, input.note)),
});
