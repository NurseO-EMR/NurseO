import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc";
import { addCourseToLocation, addLocation, deleteCourseFromLocation, deleteLocation, getCourses, getCoursesInSpecificLocation, getLocations, updateLocation } from "~/server/database/settingsDB";


export const settingRouter = createTRPCRouter({
  getCourses: protectedProcedure.query(async ({ ctx }) => getCourses(ctx.db)),
  getLocations: protectedProcedure.query(async ({ ctx }) => getLocations(ctx.db)),
  getCoursesInSpecificLocation: protectedProcedure.input(z.object({locationId: z.number()})).query(async ({ ctx, input }) => getCoursesInSpecificLocation(ctx.db, input.locationId)),
  addCourseToLocation: protectedProcedure.input(z.object({locationId: z.number(), courseId: z.number()})).mutation(async ({ ctx, input }) => addCourseToLocation(ctx.db, input.locationId, input.courseId)),
  deleteCourseFromLocation: protectedProcedure.input(z.object({locationId: z.number(), courseId: z.number()})).mutation(async ({ ctx, input }) => deleteCourseFromLocation(ctx.db, input.locationId, input.courseId)),
  deleteLocation: protectedProcedure.input(z.object({locationId: z.number()})).mutation(async ({ ctx, input }) => deleteLocation(ctx.db, input.locationId)),
  updateLocation: protectedProcedure.input(z.object({locationId: z.number(), building: z.string(), station: z.string()})).mutation(async ({ ctx, input }) => updateLocation(ctx.db, input.locationId, input.building, input.station)),
  addLocation: protectedProcedure.input(z.object({building: z.string(), station: z.string()})).mutation(async ({ ctx, input }) => addLocation(ctx.db, input.building, input.station)),
});
