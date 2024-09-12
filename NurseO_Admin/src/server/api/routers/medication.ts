import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure
} from "~/server/api/trpc";
import { getMedicationLocations } from "~/server/database/med/medicationDB";
import { addMedication, addMedicationLocation, deleteMed, deleteMedLocation, getAllMeds, getAllMedsWithLocationCount, getMedDetails, updateMedication, updateMedicationLocations } from "~/server/database/medicationDB";
import { getMedicationById, getMedicationByBarcode, addMarEntry, addMarWithNoOrder } from "~/server/database/student/medsDB";

import { medicationLocationSchema, medicationSchema } from "~/types/zodSchemaMedication";


export const medicationRouter = createTRPCRouter({
  getAllMeds: protectedProcedure.query(async ({ ctx }) => await getAllMeds(ctx.db)),
  getAllMedsWithLocationCount: protectedProcedure.query(async ({ ctx }) => await getAllMedsWithLocationCount(ctx.db)),
  deleteMed: protectedProcedure.input(z.object({ id: z.number() })).mutation(async ({ input, ctx }) => await deleteMed(ctx.db, input.id)),
  getMedDetails: protectedProcedure.input(z.object({ id: z.number() })).query(async ({ input, ctx }) => await getMedDetails(ctx.db, input.id)),
  deleteMedLocation: protectedProcedure.input(z.object({ medLocationId: z.number() })).mutation(async ({ input, ctx }) => await deleteMedLocation(ctx.db, input.medLocationId)),
  updateMedication: protectedProcedure.input(z.object({ medication: medicationSchema })).mutation(async ({ input, ctx }) => await updateMedication(ctx.db, input.medication)),
  updateMedicationLocations: protectedProcedure.input(z.object({ locations: z.array(medicationLocationSchema) })).mutation(async ({ input, ctx }) => await updateMedicationLocations(ctx.db, input.locations)),
  addMedication: protectedProcedure.input(z.object({ medication: medicationSchema })).mutation(async ({ input, ctx }) => await addMedication(ctx.db, input.medication)),
  addMedicationLocation: protectedProcedure.input(z.object({ medId: z.number(), locationId: z.number(), locationInfo: medicationLocationSchema })).mutation(async ({ input, ctx }) => await addMedicationLocation(ctx.db, input.medId, input.locationId, input.locationInfo)),

  // Student Side
  student_getMedicationById: publicProcedure.input(z.object({ medId: z.number(), locationId: z.number() })).query(async ({ input, ctx }) => getMedicationById(ctx.db, input.medId, input.locationId)),
  student_getMedicationByBarcode: publicProcedure.input(z.object({ barcode: z.string(), locationId: z.number() })).mutation(async ({ input, ctx }) => getMedicationByBarcode(ctx.db, input.barcode, input.locationId)),
  student_addMarEntry: publicProcedure.input(z.object({ orderId: z.number(), dose: z.string(), hour: z.number(), minute: z.number() })).mutation(async ({ input, ctx }) => addMarEntry(ctx.db, input.orderId, input.dose, input.hour, input.minute)),
  student_addMarWithNoOrder: publicProcedure.input(z.object({ medId: z.number(), dose: z.string(), hour: z.number(), minute: z.number(), patientId: z.number() })).mutation(async ({ input, ctx }) => addMarWithNoOrder(ctx.db, input.medId, input.dose, input.hour, input.minute, input.patientId)),


  // med
  student_getMedicationLocations: publicProcedure.input(z.object({ medId: z.number(), locationId: z.number() })).query(async ({ input, ctx }) => getMedicationLocations(ctx.db, input.medId, input.locationId)),
  student_getAllMeds: publicProcedure.mutation(async ({ ctx }) => getAllMeds(ctx.db)),
});
