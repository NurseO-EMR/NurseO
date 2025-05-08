import { z } from "zod";

import {
    createTRPCRouter,
    protectedProcedure,
} from "~/server/api/trpc";
import { patientChartSchema } from "~/types/zodSchemaPatientChart";

import { getPatientList, deletePatient, addPatientWMetaDataOnly } from "~/server/database/patientDB";
import { updatePatient } from "~/server/database/updatePatientDB";
import { getPatientById } from "~/server/database/getPatientDB";
import { getAllMeds, getAllMedsWithLocationCount, deleteMed, getMedDetails, deleteMedLocation, updateMedication, updateMedicationLocations, addMedication, addMedicationLocation } from "~/server/database/medicationDB";
import { medicationSchema, medicationLocationSchema } from "~/types/zodSchemaMedication";
import { addCourse, addCourseToLocation, addLocation, deleteCourse, deleteCourseFromLocation, deleteLocation, getCourses, getCoursesInSpecificLocation, getLocations, getUsersList, updateCourse, updateLocation } from "~/server/database/settingsDB";
import { getReportSets } from "~/server/database/reportsDB";
import { getListOfStudentPatients } from "~/server/database/studentTracker";

export const AdminRouter = createTRPCRouter({
    getPatientList: protectedProcedure.query(async ({ ctx }) => await getPatientList(ctx.db)),
    deletePatient: protectedProcedure.input(z.object({ patientId: z.number() })).mutation(async ({ input, ctx }) => await deletePatient(ctx.db, input.patientId)),
    getPatientChartById: protectedProcedure.input(z.object({ patientId: z.number() })).query(async ({ input, ctx }) => await getPatientById(ctx.db, input.patientId)),
    updatePatient: protectedProcedure.input(z.object({ oldPatient: patientChartSchema, newPatient: patientChartSchema })).mutation(async ({ ctx, input }) => await updatePatient(ctx.db, input.oldPatient, input.newPatient)),
    addPatientWMetaDataOnly: protectedProcedure.input(z.object({ patient: patientChartSchema })).mutation(async ({ ctx, input }) => await addPatientWMetaDataOnly(ctx.db, input.patient)),

    //meds
    getAllMeds: protectedProcedure.query(async ({ ctx }) => await getAllMeds(ctx.db)),
    getAllMedsWithLocationCount: protectedProcedure.query(async ({ ctx }) => await getAllMedsWithLocationCount(ctx.db)),
    deleteMed: protectedProcedure.input(z.object({ id: z.number() })).mutation(async ({ input, ctx }) => await deleteMed(ctx.db, input.id)),
    getMedDetails: protectedProcedure.input(z.object({ id: z.number() })).query(async ({ input, ctx }) => await getMedDetails(ctx.db, input.id)),
    deleteMedLocation: protectedProcedure.input(z.object({ medLocationId: z.number() })).mutation(async ({ input, ctx }) => await deleteMedLocation(ctx.db, input.medLocationId)),
    updateMedication: protectedProcedure.input(z.object({ medication: medicationSchema })).mutation(async ({ input, ctx }) => await updateMedication(ctx.db, input.medication)),
    updateMedicationLocations: protectedProcedure.input(z.object({ locations: z.array(medicationLocationSchema) })).mutation(async ({ input, ctx }) => await updateMedicationLocations(ctx.db, input.locations)),
    addMedication: protectedProcedure.input(z.object({ medication: medicationSchema })).mutation(async ({ input, ctx }) => await addMedication(ctx.db, input.medication)),
    addMedicationLocation: protectedProcedure.input(z.object({ medId: z.number(), locationId: z.number(), locationInfo: medicationLocationSchema })).mutation(async ({ input, ctx }) => await addMedicationLocation(ctx.db, input.medId, input.locationId, input.locationInfo)),


    //reports
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
    getReportSets: protectedProcedure.query(async ({ ctx }) => await getReportSets(ctx.db)),


    // Student Tracker
    getListOfStudentPatients: protectedProcedure.query(async ({ ctx }) => await getListOfStudentPatients(ctx.db)),
});
