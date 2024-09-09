import { ReportType } from "@nurse-o-core/index";
import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure
} from "~/server/api/trpc";
import { getReportSets } from "~/server/database/reportsDB";
import { saveStudentsReports, getStudentsReport, getReportSets as getStudentReportSets } from "~/server/database/student/reportsDB";


const StudentReportSchema = z.object({
  setName: z.string(),
  fieldName: z.string(),
  time: z.string(),
  value: z.string(),
  date: z.string(),
  reportType: z.nativeEnum(ReportType)
})

export const reportsRouter = createTRPCRouter({
  getReportSets: protectedProcedure.query(async ({ ctx }) => getReportSets(ctx.db)),
  student_getReportSets: publicProcedure.input(z.object({ reportType: z.string() })).query(async ({ input, ctx }) => getStudentReportSets(ctx.db, input.reportType)),
  student_saveStudentsReports: publicProcedure.input(z.object({ studentReport: z.array(StudentReportSchema), patientId: z.number() })).mutation(async ({ input, ctx }) => saveStudentsReports(ctx.db, input.studentReport, input.patientId)),
  student_getStudentsReports: publicProcedure.input(z.object({ reportType: z.nativeEnum(ReportType), patientId: z.number() })).query(async ({ input, ctx }) => getStudentsReport(ctx.db, input.reportType, input.patientId)),
});
