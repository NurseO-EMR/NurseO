import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure
} from "~/server/api/trpc";
import { deletePatient, getPatientList } from "~/server/database/patientDB";

export const patientRouter = createTRPCRouter({
  getPatientList: protectedProcedure.query(({ctx})=>getPatientList(ctx.db)),
  deletePatient: protectedProcedure.input(z.object({patientId: z.number()})).mutation(({input, ctx})=>deletePatient(ctx.db, input.patientId)),

});
