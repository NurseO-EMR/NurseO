import { Prisma, type PrismaClient } from "@prisma/client";
import { type ReportType, type Gender, type MedicationOrder, type PatientChart, type CustomOrder, type OrderKind, type OrderType, type MarRecord, type Frequency, type Routine } from '~/core/index';
import { copyPatient } from "./addPatientDB";
import { signInState } from "~/types/flags";
import { type Session } from "next-auth";

type patientMetaData = {
       id: number;
       name: string;
       dob: string;
       age: string;
       gender: string;
       height: string;
       weight: string;
       time_hour: number;
       time_minute: number;
       lab_doc_url: string;
       imaging_url: string;
       diagnosis: string;
       course_id: number;
       patient_bar_code: string;
       student_id: string
       chief_complaint: string
       code: string;
       studentUID: string
       template: boolean
}

type Context = { db: PrismaClient, session: Session | null }

export async function isBarcodeUsedByPatient(db: PrismaClient, templatePatientBarCode: string) {
       const patients = await db.$queryRaw<{ id: number }[]>`SELECT id FROM Patient WHERE Patient.template = true AND Patient.patient_bar_code = ${templatePatientBarCode} LIMIT 1;`
       return patients.length > 0
}

export async function getPatientByBarCode(ctx: Context, templatePatientBarCode: string, locationId: number, studentId: string, studentUID: string | undefined): Promise<PatientChart | null> {

       const metaData = await getPatientBasicInfoByBarCode(ctx.db, templatePatientBarCode, studentId, locationId, studentUID)
       if (!metaData) return null

       const patient = await getPatientChart(ctx.db, metaData, studentId, studentUID)

       if (studentId !== signInState.anonymousSignIn.valueOf() && !metaData.student_id) {
              patient.studentUID = ctx.session?.user.id
              patient.studentId = studentId

              return await copyPatient(ctx.db, patient)
       }

       return patient
}

export async function getPatientById(db: PrismaClient, patientId: number, studentId: string | undefined | null, studentUID: string | undefined): Promise<PatientChart | null> {
       try {
              const metaData = await getPatientBasicInfoById(db, patientId)
              if (!metaData) return null
              const patient = await getPatientChart(db, metaData, studentId, studentUID)
              return patient
       } catch {
              return null
       }


}



async function getPatientChart(db: PrismaClient, metaData: patientMetaData, studentId: string | undefined | null, studentUID: string | undefined) {

       const [allergies, customOrders, socialHistory,
              medicalHistory, notes, studentReports,
              flags, immunizations, medicationOrders] = await Promise.all([
                     getAllergies(db, metaData.id),
                     getCustomOrders(db, metaData.id),
                     getSocialHistory(db, metaData.id),
                     getMedicalHistory(db, metaData.id),
                     getNotes(db, metaData.id),
                     getStudentReports(db, metaData.id),
                     getFlags(db, metaData.id),
                     getImmunizations(db, metaData.id),
                     getMedOrders(db, metaData.id),
              ]).catch((e) => {
                     throw new Error("One or more parts of the chart failed to fetch error: " + e)
              })

       const patient: PatientChart = {
              dbId: metaData.id,
              name: metaData.name,
              dob: metaData.dob,
              age: metaData.age,
              gender: metaData.gender as Gender,
              height: metaData.height,
              weight: metaData.weight,
              chiefComplaint: metaData.chief_complaint,
              time: {
                     hour: metaData.time_hour,
                     minute: metaData.time_minute,
              },
              labDocURL: metaData.lab_doc_url,
              imagingURL: metaData.imaging_url,
              diagnosis: metaData.diagnosis,
              courseId: metaData.course_id,
              id: metaData.patient_bar_code,
              code: metaData.code,
              allergies,
              customOrders,
              socialHistory,
              medicalHistory,
              notes,
              studentReports,
              flags,
              immunizations,
              medicationOrders,
              studentId: studentId,
              studentUID: studentUID,

       }

       return patient
}

export async function getPatientBasicInfoById(db: PrismaClient, patientId: number) {
       const patient = await db.$queryRaw<patientMetaData[]>`
                        SELECT id ,name, dob, age, gender, height, weight, time_hour, time_minute, lab_doc_url, imaging_url,
                               diagnosis, course_id, patient_bar_code, chief_complaint, code, studentUID, template
                        FROM Patient WHERE id = ${patientId} LIMIT 1;`
       if (!patient || patient.length == 0) return null
       return patient[0]
}

async function getPatientBasicInfoByBarCode(db: PrismaClient, templatePatientBarCode: string, studentId: string, locationId: number, studentUID: string | undefined) {

       let patient: patientMetaData[] = []

       if (studentId.length > 0 && studentId !== signInState.anonymousSignIn.valueOf()) {
              patient = await db.$queryRaw<patientMetaData[]>`
              SELECT Patient.id , Patient.name, dob, age, gender, height, weight, time_hour, time_minute, lab_doc_url, imaging_url,
                     diagnosis, Patient.course_id, patient_bar_code, student_id, chief_complaint, code
              FROM Patient 
              JOIN Course ON Course.id = Patient.course_id
              JOIN Course_Location_Information ON Course_Location_Information.course_id = Course.id
              WHERE Course_Location_Information.location_id = ${locationId}
              AND patient_bar_code = ${templatePatientBarCode} 
              AND student_id = ${studentId}
              AND studentUID = ${studentUID}  
              AND template = false
              LIMIT 1;`
       }

       if (studentId.length === 0 || studentId === signInState.anonymousSignIn.valueOf() || patient.length === 0) {
              patient = await db.$queryRaw<patientMetaData[]>`
              SELECT Patient.id ,Patient.name, dob, age, gender, height, weight, time_hour, time_minute, lab_doc_url, imaging_url,
                     diagnosis, Patient.course_id, patient_bar_code, student_id, chief_complaint, code
              FROM Patient 
              JOIN Course ON Course.id = Patient.course_id
              JOIN Course_Location_Information ON Course_Location_Information.course_id = Course.id
              WHERE Course_Location_Information.location_id = ${locationId}
              AND patient_bar_code = ${templatePatientBarCode} 
              AND template = true
              LIMIT 1;`
       }

       if (!patient || patient.length == 0) return null
       return patient[0]

}

async function getAllergies(db: PrismaClient, patientId: number) {
       const data = await db.$queryRaw<{ name: string, reaction: string }[]>`
                        SELECT name, reaction FROM Allergy WHERE patient_id = ${patientId};`
       return data
}


async function getCustomOrders(db: PrismaClient, patientId: number): Promise<CustomOrder[]> {
       const data = await db.$queryRaw<{ orderKind: OrderKind, orderType: OrderType, time?: string, order: string, orderIndex: number }[]>`
                        SELECT order_kind as orderKind, order_type as orderType, time, order_text as "order", order_index as orderIndex, icd_10_code as ICD10Code, ICD_10.description as ICD10Description
                        FROM Custom_Order 
                        LEFT JOIN ICD_10 ON ICD_10.code = icd_10_code
                        WHERE patient_id = ${patientId} 
                        ORDER BY order_index ASC;
                        `
       return data
}


async function getSocialHistory(db: PrismaClient, patientId: number) {
       const data = await db.$queryRaw<{ history: string }[]>`
                        SELECT history FROM Social_History WHERE patient_id = ${patientId};`
       return data.map(v => v.history)
}

async function getMedicalHistory(db: PrismaClient, patientId: number) {
       const data = await db.$queryRaw<{ date: string, title: string, notes: string }[]>`
                        SELECT date, title, notes FROM Medical_History WHERE patient_id = ${patientId};`
       return data
}

async function getNotes(db: PrismaClient, patientId: number) {
       const data = await db.$queryRaw<{ date: string, note: string, type: string }[]>`
                        SELECT date, note, type FROM Note WHERE patient_id = ${patientId};`
       return data
}

async function getStudentReports(db: PrismaClient, patientId: number) {
       const data = await db.$queryRaw<{ setName: string, fieldName: string, time: string, value: string, date: string, reportType: ReportType }[]>`
                        SELECT set_name as setName, field_name as fieldName, time, value, date, report_type as reportType FROM Student_Report WHERE patient_id = ${patientId};`
       return data
}

async function getFlags(db: PrismaClient, patientId: number) {
       const data = await db.$queryRaw<{ name: string, reason: string }[]>`
                        SELECT name, reason FROM Flag WHERE patient_id = ${patientId};`
       return data
}

async function getImmunizations(db: PrismaClient, patientId: number) {
       const data = await db.$queryRaw<{ immunization: string }[]>`
                        SELECT immunization FROM Immunization WHERE patient_id = ${patientId};`
       return data.map(i => i.immunization)
}

async function getMedOrders(db: PrismaClient, patientId: number): Promise<MedicationOrder[]> {
       const orders = await db.$queryRaw<{ orderId: number, id: number, concentration: string, route: string, frequency: Frequency, routine: Routine, PRNNote: string, notes: string, orderKind: OrderKind, orderType: OrderType, time: string, completed: boolean, holdReason: string, orderIndex: number, brandName: string, genericName: string, ICD10Code: string, ICD10Description: string, refills: number, dispenseQuantity: string }[]>`
                            SELECT Med_Order.id as orderId, med_id as id, concentration, route, frequency, routine, prn_note as PRNNote, 
                            notes, order_kind as orderKind, order_type as orderType, time, completed, hold_reason as holdReason, order_index as orderIndex, 
                            brand_name as brandName, generic_name as genericName, icd_10_code as ICD10Code, ICD_10.description as ICD10Description, refills, dispenseQuantity
                            FROM Med_Order 
                            INNER JOIN Medication on Med_Order.med_id = Medication.id
                            LEFT JOIN ICD_10 ON ICD_10.code = icd_10_code
                            WHERE patient_id = ${patientId}  
                            ORDER BY order_index ASC;
                        `

       if (orders.length === 0) return [];

       const orderIds = orders.map(o => o.orderId)

       const marRecords = await db.$queryRaw<{ medOrderId: number, dose: string, hour: number, minute: number }[]>`
                        SELECT med_order_id as medOrderId, dose, hour, minute FROM Mar_Record WHERE med_order_id in (${Prisma.join(orderIds)});
       `

       const medOrders: MedicationOrder[] = []
       for (const order of orders) {
              const medOrder: MedicationOrder = {
                     ...order,
                     icd10: {
                            code: order.ICD10Code,
                            description: order.ICD10Description
                     },
                     mar: marRecords.filter(m => m.medOrderId == order.orderId).map(r => {
                            return {
                                   hour: r.hour,
                                   minute: r.minute,
                                   dose: r.dose
                            } as MarRecord
                     })
              }
              medOrders.push(medOrder)
       }

       return medOrders
}



