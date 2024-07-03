import { z } from "zod";

import {createTRPCRouter, publicProcedure} from "~/server/api/trpc";
import { getAllMeds, getMedicationLocations } from "~/server/database/medicationDB";

export const medicationRouter = createTRPCRouter({
    getMedicationLocations: publicProcedure.input(z.object({medId: z.number(), locationId: z.number()})).query(async ({input, ctx})=>getMedicationLocations(ctx.db, input.medId, input.locationId)),
    getAllMeds: publicProcedure.mutation(async ({ctx})=>getAllMeds(ctx.db)),
});
