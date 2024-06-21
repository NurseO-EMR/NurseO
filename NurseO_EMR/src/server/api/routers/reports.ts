import { ReportType } from "@nurse-o-core/index";
import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { getReportSets, getStudentsReport, saveStudentsReports } from "~/server/database/reportsDB";


const StudentReportSchema = z.object({
  setName: z.string(),
  fieldName: z.string(),
  time: z.string(),
  value: z.string(),
  date: z.string(),
  reportType: z.nativeEnum(ReportType)
})

export const reportsRoute = createTRPCRouter({
  getReportSets: publicProcedure.input(z.object({ reportType: z.string() })).query(async ({ input, ctx }) => getReportSets(ctx.db, input.reportType)),
  saveStudentsReports: publicProcedure.input(z.object({ studentReport: z.array(StudentReportSchema), patientId: z.number()})).mutation(async ({ input, ctx }) => saveStudentsReports(ctx.db, input.studentReport, input.patientId)),
  getStudentsReports: publicProcedure.input(z.object({ reportType: z.nativeEnum(ReportType), patientId: z.number()})).query(async ({ input, ctx }) => getStudentsReport(ctx.db, input.reportType, input.patientId)),
});
