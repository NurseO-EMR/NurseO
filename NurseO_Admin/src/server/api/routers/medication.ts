import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc";
import { addMedication, addMedicationLocation, deleteMed, deleteMedLocation, getAllMeds, getAllMedsWithLocationCount, getMedDetails, updateMedication, updateMedicationLocations } from "~/server/database/medicationDB";
import { medicationLocationSchema, medicationSchema } from "~/types/zodSchemaMedication";


export const medicationRouter = createTRPCRouter({
  getAllMeds: protectedProcedure.query(async ({ ctx }) => await getAllMeds(ctx.db)),
  getAllMedsWithLocationCount: protectedProcedure.query(async ({ctx})=> await getAllMedsWithLocationCount(ctx.db)),
  deleteMed: protectedProcedure.input(z.object({id: z.number()})).mutation(async ({input, ctx})=> await deleteMed(ctx.db, input.id)),
  getMedDetails: protectedProcedure.input(z.object({id: z.number()})).query(async ({input, ctx})=> await getMedDetails(ctx.db, input.id)),
  deleteMedLocation: protectedProcedure.input(z.object({medLocationId: z.number()})).mutation(async ({input, ctx})=> await deleteMedLocation(ctx.db, input.medLocationId)),
  updateMedication: protectedProcedure.input(z.object({medication: medicationSchema})).mutation(async ({input, ctx})=> await updateMedication(ctx.db, input.medication)),
  updateMedicationLocations: protectedProcedure.input(z.object({locations: z.array(medicationLocationSchema)})).mutation(async ({input, ctx})=> await updateMedicationLocations(ctx.db, input.locations)),
  addMedication: protectedProcedure.input(z.object({medication: medicationSchema})).mutation(async ({input, ctx})=> await addMedication(ctx.db, input.medication)),
  addMedicationLocation: protectedProcedure.input(z.object({medId: z.number(), locationId: z.number(), locationInfo: medicationLocationSchema})).mutation(async ({input, ctx})=> await addMedicationLocation(ctx.db, input.medId, input.locationId, input.locationInfo)),
  
});
