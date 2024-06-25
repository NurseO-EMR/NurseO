import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure
} from "~/server/api/trpc";
import { getPatientById } from "~/server/database/getPatientDB";
import { deletePatient, getPatientList } from "~/server/database/patientDB";
import { updatePatient } from "~/server/database/updatePatientDB";
import { patientChartSchema } from "~/types/zodSchemaPatientChart";

export const patientRouter = createTRPCRouter({
  getPatientList: protectedProcedure.query(({ctx})=>getPatientList(ctx.db)),
  deletePatient: protectedProcedure.input(z.object({patientId: z.number()})).mutation(({input, ctx})=>deletePatient(ctx.db, input.patientId)),
  getPatientChartById: protectedProcedure.input(z.object({patientId: z.number()})).query(({input,ctx})=>getPatientById(ctx.db, input.patientId)),
  updatePatient: protectedProcedure.input(z.object({oldPatient: patientChartSchema, newPatient: patientChartSchema})).mutation(({ctx, input})=>updatePatient(ctx.db, input.oldPatient, input.newPatient))

});
