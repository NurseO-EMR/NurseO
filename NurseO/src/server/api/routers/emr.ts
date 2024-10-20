import { z } from "zod";

import {
    createTRPCRouter,
    publicProcedure
} from "~/server/api/trpc";
import { medicalHistorySchema } from "~/types/zodSchemaPatientChart";

import { getPatientByBarCode, isBarcodeUsedByPatient } from "~/server/database/student/patientDB/getPatientDB";
import { addMedicalHistory, addNote, updateChiefCompliant, updateOrderHoldInfo } from "~/server/database/student/patientDB/updatePatientDB";
import { getMedicationById, getMedicationByBarcode, addMarEntry, addMarWithNoOrder } from "~/server/database/student/medsDB";
import { saveStudentsReports, getStudentsReport, getReportSets as getStudentReportSets } from "~/server/database/student/reportsDB";
import { ReportType } from "~/core";

const StudentReportSchema = z.object({
    setName: z.string(),
    fieldName: z.string(),
    time: z.string(),
    value: z.string(),
    date: z.string(),
    reportType: z.nativeEnum(ReportType)
})


export const EMRRouter = createTRPCRouter({
    student_getPatient: publicProcedure.input(z.object({ barcode: z.string(), locationId: z.number(), studentId: z.string() || z.null() })).mutation(async ({ input, ctx }) => await getPatientByBarCode(ctx.db, input.barcode, input.locationId, input.studentId)),
    student_updatePatientHoldInfo: publicProcedure.input(z.object({ orderId: z.number(), holdReason: z.string().nullable() })).mutation(async ({ input, ctx }) => await updateOrderHoldInfo(ctx.db, input.orderId, input.holdReason)),
    student_addNote: publicProcedure.input(z.object({ patientId: z.number(), date: z.string(), note: z.string() })).mutation(async ({ input, ctx }) => await addNote(ctx.db, input.patientId, input.date, input.note)),
    student_isBarcodeUsedByPatient: publicProcedure.input(z.object({ barcode: z.string() })).mutation(async ({ ctx, input }) => await isBarcodeUsedByPatient(ctx.db, input.barcode)),
    student_updateChiefCompliant: publicProcedure.input(z.object({ patientId: z.number(), chiefCompliant: z.string() })).mutation(async ({ ctx, input }) => await updateChiefCompliant(ctx.db, input.patientId, input.chiefCompliant)),
    student_addMedicalHistory: publicProcedure.input(z.object({ patientId: z.number(), medicalHistory: medicalHistorySchema })).mutation(async ({ input, ctx }) => await addMedicalHistory(ctx.db, input.patientId, input.medicalHistory)),

    //meds
    student_getMedicationById: publicProcedure.input(z.object({ medId: z.number(), locationId: z.number() })).query(async ({ input, ctx }) => await getMedicationById(ctx.db, input.medId, input.locationId)),
    student_getMedicationByBarcode: publicProcedure.input(z.object({ barcode: z.string(), locationId: z.number() })).mutation(async ({ input, ctx }) => await getMedicationByBarcode(ctx.db, input.barcode, input.locationId)),
    student_addMarEntry: publicProcedure.input(z.object({ orderId: z.number(), dose: z.string(), hour: z.number(), minute: z.number() })).mutation(async ({ input, ctx }) => await addMarEntry(ctx.db, input.orderId, input.dose, input.hour, input.minute)),
    student_addMarWithNoOrder: publicProcedure.input(z.object({ medId: z.number(), dose: z.string(), hour: z.number(), minute: z.number(), patientId: z.number() })).mutation(async ({ input, ctx }) => await addMarWithNoOrder(ctx.db, input.medId, input.dose, input.hour, input.minute, input.patientId)),

    //reports
    student_getReportSets: publicProcedure.input(z.object({ reportType: z.string() })).query(async ({ input, ctx }) => await getStudentReportSets(ctx.db, input.reportType)),
    student_saveStudentsReports: publicProcedure.input(z.object({ studentReport: z.array(StudentReportSchema), patientId: z.number() })).mutation(async ({ input, ctx }) => await saveStudentsReports(ctx.db, input.studentReport, input.patientId)),
    student_getStudentsReports: publicProcedure.input(z.object({ reportType: z.nativeEnum(ReportType), patientId: z.number() })).query(async ({ input, ctx }) => await getStudentsReport(ctx.db, input.reportType, input.patientId)),
});
