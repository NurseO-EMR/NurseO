import { z } from "zod";

import {
    createTRPCRouter,
    publicProcedure
} from "~/server/api/trpc";
import { getAllMeds } from "~/server/database/medicationDB";



export const GradRouter = createTRPCRouter({
    student_getAllMeds: publicProcedure.query(async ({ ctx }) => await getAllMeds(ctx.db)),
});
