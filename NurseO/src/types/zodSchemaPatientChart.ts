// Generated by ts-to-zod
import { z } from "zod";
import {
  OrderKind,
  OrderType,
  Frequency,
  ReportType,
  Gender,
} from "~/core/index";

export const timeSchema = z.object({
  hour: z.number(),
  minute: z.number(),
});

export const orderKindSchema = z.nativeEnum(OrderKind);

export const orderTypeSchema = z.nativeEnum(OrderType);

export const orderSchema = z.object({
  orderKind: orderKindSchema,
  orderType: orderTypeSchema,
  time: z.string().optional().nullable(),
  orderIndex: z.number()
});

export const frequencySchema = z.nativeEnum(Frequency);

export const routineSchema = z.string();

export const marRecordSchema = z.object({
  hour: z.number(),
  minute: z.number(),
  dose: z.string().optional(),
});

export const medicalHistorySchema = z.object({
  date: z.string(),
  title: z.string(),
  notes: z.string(),
});

export const assessmentSchema = z.object({
  date: z.date(),
  summery: z.string(),
});

export const flagSchema = z.object({
  name: z.string(),
  reason: z.string(),
});

export const allergySchema = z.object({
  name: z.string(),
  reaction: z.string(),
});

export const reportTypeSchema = z.nativeEnum(ReportType);

export const reportInputTypeSchema = z.union([
  z.literal("number"),
  z.literal("text"),
  z.literal("T/F"),
  z.literal("checkbox"),
  z.literal("options"),
  z.literal("NA"),
]);

export const studentReportSchema = z.object({
  setName: z.string(),
  fieldName: z.string(),
  time: z.string(),
  value: z.string(),
  date: z.string(),
  reportType: reportTypeSchema,
});

export const genderSchema = z.nativeEnum(Gender);

export const medicationOrderSchema = orderSchema.and(
  z.object({
    id: z.number(),
    orderId: z.number(),
    concentration: z.string(),
    route: z.string(),
    frequency: frequencySchema,
    routine: routineSchema,
    PRNNote: z.string().nullable(),
    notes: z.string(),
    mar: z.array(marRecordSchema),
    completed: z.boolean().optional(),
    holdReason: z.string().optional().nullable(),
    genericName: z.string().optional(),
    brandName: z.string().optional(),
    narcoticCountNeeded: z.boolean().optional(),
  }),
);

export const customOrderSchema = orderSchema.and(
  z.object({
    order: z.string(),
  }),
);

export const noteSchema = z.object({
  date: z.string(),
  note: z.string(),
  reportName: z.string(),
  reportType: reportTypeSchema,
});

export const reportFieldSchema = z.object({
  name: z.string(),
  fieldType: reportInputTypeSchema,
  options: z.array(z.string()).optional(),
  labels: z.array(z.string()).optional(),
  addSecondField: z.boolean().optional(),
});

export const patientChartSchema = z.object({
  id: z.string(),
  name: z.string(),
  dob: z.string(),
  age: z.string(),
  gender: genderSchema,
  height: z.string(),
  weight: z.string(),
  time: timeSchema,
  allergies: z.array(allergySchema),
  medicalHistory: z.array(medicalHistorySchema),
  socialHistory: z.array(z.string()),
  medicationOrders: z.array(medicationOrderSchema),
  customOrders: z.array(customOrderSchema),
  flags: z.array(flagSchema),
  immunizations: z.array(z.string()),
  studentReports: z.array(studentReportSchema),
  notes: z.array(noteSchema),
  studentId: z.string().nullable().optional(),
  labDocURL: z.string().nullable().optional(),
  imagingURL: z.string().nullable().optional(),
  diagnosis: z.string().nullable().optional(),
  courseId: z.number(),
  dbId: z.number(),
});

export const reportSetSchema = z.object({
  name: z.string(),
  reportFields: z.array(reportFieldSchema),
  image: z.string().optional(),
  imageAlt: z.string().optional(),
  type: reportTypeSchema,
});