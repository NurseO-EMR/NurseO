import { z } from "zod";

import { createTRPCRouter, studentProcedure } from "~/server/api/trpc";
import { getAllMeds } from "~/server/database/medicationDB";
import { addCustomOrderToStudentPatient, addMedOrderToStudentPatient } from "~/server/database/student/patientDB/ordersDB";
import { customOrderSchema, medicationOrderSchema } from "~/types/zodSchemaPatientChart";



export const GradRouter = createTRPCRouter({
    student_getAllMeds: studentProcedure.query(async ({ ctx }) => await getAllMeds(ctx.db)),
    student_addMedOrder: studentProcedure.input(z.object({ order: medicationOrderSchema, patientId: z.number() })).mutation(({ ctx, input }) => addMedOrderToStudentPatient(ctx.db, input.order, input.patientId, ctx.session)),
    student_addCustomOrder: studentProcedure.input(z.object({ order: customOrderSchema, patientId: z.number() })).mutation(({ ctx, input }) => addCustomOrderToStudentPatient(ctx.db, input.order, input.patientId, ctx.session))
});
