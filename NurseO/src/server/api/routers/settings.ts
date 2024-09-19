import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc";
import { addCourse, addCourseToLocation, addLocation, deleteCourse, deleteCourseFromLocation, deleteLocation, getCourses, getCoursesInSpecificLocation, getLocations, getUsersList, updateCourse, updateLocation } from "~/server/database/settingsDB";


export const settingRouter = createTRPCRouter({
  getCourses: protectedProcedure.query(async ({ ctx }) => await getCourses(ctx.db)),
  deleteCourse: protectedProcedure.input(z.object({ courseId: z.number() })).mutation(async ({ ctx, input }) => await deleteCourse(ctx.db, input.courseId)),
  updateCourse: protectedProcedure.input(z.object({ courseId: z.number(), courseName: z.string() })).mutation(async ({ ctx, input }) => await updateCourse(ctx.db, input.courseId, input.courseName)),
  addCourse: protectedProcedure.input(z.object({ courseName: z.string() })).mutation(async ({ ctx, input }) => await addCourse(ctx.db, input.courseName)),
  

  getLocations: protectedProcedure.query(async ({ ctx }) => getLocations(ctx.db)),
  getCoursesInSpecificLocation: protectedProcedure.input(z.object({ locationId: z.number() })).query(async ({ ctx, input }) => await getCoursesInSpecificLocation(ctx.db, input.locationId)),
  addCourseToLocation: protectedProcedure.input(z.object({ locationId: z.number(), courseId: z.number() })).mutation(async ({ ctx, input }) => await addCourseToLocation(ctx.db, input.locationId, input.courseId)),
  deleteCourseFromLocation: protectedProcedure.input(z.object({ locationId: z.number(), courseId: z.number() })).mutation(async ({ ctx, input }) => await deleteCourseFromLocation(ctx.db, input.locationId, input.courseId)),
  deleteLocation: protectedProcedure.input(z.object({ locationId: z.number() })).mutation(async ({ ctx, input }) => await deleteLocation(ctx.db, input.locationId)),
  updateLocation: protectedProcedure.input(z.object({ locationId: z.number(), building: z.string(), station: z.string() })).mutation(async ({ ctx, input }) => await updateLocation(ctx.db, input.locationId, input.building, input.station)),
  addLocation: protectedProcedure.input(z.object({ building: z.string(), station: z.string() })).mutation(async ({ ctx, input }) => await addLocation(ctx.db, input.building, input.station)),
  getUsersList: protectedProcedure.query(async ({ ctx }) => await getUsersList(ctx.db)),
});
