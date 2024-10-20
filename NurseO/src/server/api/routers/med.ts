import { z } from "zod";

import {
    createTRPCRouter,
    publicProcedure
} from "~/server/api/trpc";
import { getAllMeds } from "~/server/database/medicationDB";
import { getMedicationLocations } from "~/server/database/med/medicationDB";
import { getListOfPatients, getPatientMedOrders } from "~/server/database/med/patientDB";



export const MedRouter = createTRPCRouter({
    student_getListOfPatients: publicProcedure.input(z.object({ locationId: z.number() })).query(async ({ input, ctx }) => await getListOfPatients(ctx.db, input.locationId)),
    student_getPatientMedOrders: publicProcedure.input(z.object({ patientId: z.number() })).mutation(async ({ input, ctx }) => await getPatientMedOrders(ctx.db, input.patientId)),

    student_getMedicationLocations: publicProcedure.input(z.object({ medId: z.number(), locationId: z.number() })).query(async ({ input, ctx }) => await getMedicationLocations(ctx.db, input.medId, input.locationId)),
    student_getAllMeds: publicProcedure.mutation(async ({ ctx }) => await getAllMeds(ctx.db)),
});
