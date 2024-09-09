import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure
} from "~/server/api/trpc";
import { getPatientById } from "~/server/database/getPatientDB";
import { addPatientWMetaDataOnly, deletePatient, getPatientList } from "~/server/database/patientDB";
import { updatePatient } from "~/server/database/updatePatientDB";
import { patientChartSchema } from "~/types/zodSchemaPatientChart";

import { getPatientByBarCode } from "~/server/database/student/patientDB/getPatientDB";
import { addNote, updateOrderHoldInfo } from "~/server/database/student/patientDB/updatePatientDB";

export const patientRouter = createTRPCRouter({
  getPatientList: protectedProcedure.query(({ ctx }) => getPatientList(ctx.db)),
  deletePatient: protectedProcedure.input(z.object({ patientId: z.number() })).mutation(({ input, ctx }) => deletePatient(ctx.db, input.patientId)),
  getPatientChartById: protectedProcedure.input(z.object({ patientId: z.number() })).query(({ input, ctx }) => getPatientById(ctx.db, input.patientId)),
  updatePatient: protectedProcedure.input(z.object({ oldPatient: patientChartSchema, newPatient: patientChartSchema })).mutation(({ ctx, input }) => updatePatient(ctx.db, input.oldPatient, input.newPatient)),
  addPatientWMetaDataOnly: protectedProcedure.input(z.object({ patient: patientChartSchema })).mutation(({ ctx, input }) => addPatientWMetaDataOnly(ctx.db, input.patient)),


  // Student Side
  student_getPatient: publicProcedure.input(z.object({ barcode: z.string(), locationId: z.number(), studentId: z.string() || z.null() })).mutation(async ({ input, ctx }) => getPatientByBarCode(ctx.db, input.barcode, input.locationId, input.studentId)),
  student_updatePatientHoldInfo: publicProcedure.input(z.object({ orderId: z.number(), holdReason: z.string().nullable() })).mutation(async ({ input, ctx }) => updateOrderHoldInfo(ctx.db, input.orderId, input.holdReason)),
  student_addNote: publicProcedure.input(z.object({ patientId: z.number(), date: z.string(), reportName: z.string(), reportType: z.string(), note: z.string() })).mutation(async ({ input, ctx }) => addNote(ctx.db, input.patientId, input.date, input.reportName, input.reportType, input.note)),
});
