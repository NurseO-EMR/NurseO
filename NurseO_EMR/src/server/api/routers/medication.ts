import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { getMedicationById, getMedicationByBarcode, addMarEntry, addMarWithNoOrder } from "~/server/database/medsDB";

export const medicationRoute = createTRPCRouter({
  getMedicationById: publicProcedure.input(z.object({ medId: z.number(), locationId: z.number() })).query(async ({ input, ctx }) => getMedicationById(ctx.db, input.medId, input.locationId)),
  getMedicationByBarcode: publicProcedure.input(z.object({ barcode: z.string(), locationId: z.number() })).mutation(async ({ input, ctx }) => getMedicationByBarcode(ctx.db, input.barcode, input.locationId)),
  addMarEntry: publicProcedure.input(z.object({ orderId: z.number(), dose: z.string(), hour: z.number(), minute: z.number() })).mutation(async ({ input, ctx }) => addMarEntry(ctx.db, input.orderId, input.dose, input.hour, input.minute)),
  addMarWithNoOrder: publicProcedure.input(z.object({ medId: z.number(), dose: z.string(), hour: z.number(), minute: z.number(), patientId: z.number() })).mutation(async ({ input, ctx }) => addMarWithNoOrder(ctx.db, input.medId, input.dose, input.hour, input.minute, input.patientId))
});
