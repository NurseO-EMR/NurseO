import { z } from "zod";
import {getListOfPatients, getPatientMedOrders} from "../../database/patientDB"

import {createTRPCRouter, publicProcedure} from "~/server/api/trpc";

export const patientRouter = createTRPCRouter({
  getListOfPatients: publicProcedure.input(z.object({locationId: z.number()})).query(async ({input, ctx})=>getListOfPatients(ctx.db, input.locationId)),
  getPatientMedOrders: publicProcedure.input(z.object({patientId: z.number()})).mutation(async ({input, ctx})=>getPatientMedOrders(ctx.db, input.patientId))
  
});
