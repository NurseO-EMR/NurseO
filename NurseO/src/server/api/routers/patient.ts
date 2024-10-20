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

import { getPatientByBarCode, isBarcodeUsedByPatient } from "~/server/database/student/patientDB/getPatientDB";
import { addNote, updateChiefCompliant, updateOrderHoldInfo } from "~/server/database/student/patientDB/updatePatientDB";
import { getListOfPatients, getPatientMedOrders } from "~/server/database/med/patientDB";

export const patientRouter = createTRPCRouter({
  getPatientList: protectedProcedure.query(async ({ ctx }) => await getPatientList(ctx.db)),
  deletePatient: protectedProcedure.input(z.object({ patientId: z.number() })).mutation(async ({ input, ctx }) => await deletePatient(ctx.db, input.patientId)),
  getPatientChartById: protectedProcedure.input(z.object({ patientId: z.number() })).query(async ({ input, ctx }) => await getPatientById(ctx.db, input.patientId)),
  updatePatient: protectedProcedure.input(z.object({ oldPatient: patientChartSchema, newPatient: patientChartSchema })).mutation(async ({ ctx, input }) => await updatePatient(ctx.db, input.oldPatient, input.newPatient)),
  addPatientWMetaDataOnly: protectedProcedure.input(z.object({ patient: patientChartSchema })).mutation(async ({ ctx, input }) => await addPatientWMetaDataOnly(ctx.db, input.patient)),


  // Student Side
  student_getPatient: publicProcedure.input(z.object({ barcode: z.string(), locationId: z.number(), studentId: z.string() || z.null() })).mutation(async ({ input, ctx }) => await getPatientByBarCode(ctx.db, input.barcode, input.locationId, input.studentId)),
  student_updatePatientHoldInfo: publicProcedure.input(z.object({ orderId: z.number(), holdReason: z.string().nullable() })).mutation(async ({ input, ctx }) => await updateOrderHoldInfo(ctx.db, input.orderId, input.holdReason)),
  student_addNote: publicProcedure.input(z.object({ patientId: z.number(), date: z.string(), note: z.string() })).mutation(async ({ input, ctx }) => await addNote(ctx.db, input.patientId, input.date, input.note)),
  student_isBarcodeUsedByPatient: publicProcedure.input(z.object({ barcode: z.string() })).mutation(async ({ ctx, input }) => await isBarcodeUsedByPatient(ctx.db, input.barcode)),
  student_updateChiefCompliant: publicProcedure.input(z.object({ patientId: z.number(), chiefCompliant: z.string() })).mutation(async ({ ctx, input }) => await updateChiefCompliant(ctx.db, input.patientId, input.chiefCompliant)),


  //med
  student_getListOfPatients: publicProcedure.input(z.object({ locationId: z.number() })).query(async ({ input, ctx }) => await getListOfPatients(ctx.db, input.locationId)),
  student_getPatientMedOrders: publicProcedure.input(z.object({ patientId: z.number() })).mutation(async ({ input, ctx }) => await getPatientMedOrders(ctx.db, input.patientId))
});
