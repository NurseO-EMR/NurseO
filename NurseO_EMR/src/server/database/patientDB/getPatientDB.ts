import { Prisma, type PrismaClient } from "@prisma/client";
import { type ReportType, type Gender, type MedicationOrder, type PatientChart, type CustomOrder, type OrderKind, type OrderType, type MarRecord, type Frequency, type Routine } from '@nurse-o-core/index';
import { copyPatient } from "./addPatientDB";
import { signInState } from "~/types/flags";

export async function getPatient(db: PrismaClient, templatePatientBarCode: string, location: string, studentId: string): Promise<PatientChart | null> {
       const metaData = await getPatientBasicInfo(db, templatePatientBarCode)

       if(!metaData) return null

       const allergies = await getAllergies(db, metaData.id)
       const customOrders = await getCustomOrders(db, metaData.id)
       const socialHistory = await getSocialHistory(db, metaData.id)
       const medicalHistory = await getMedicalHistory(db, metaData.id)
       const notes = await getNotes(db, metaData.id)
       const studentReports = await getStudentReports(db, metaData.id)
       const flags = await getFlags(db, metaData.id)
       const immunizations = await getImmunizations(db, metaData.id)
       const medicationOrders = await getMedOrders(db, metaData.id)

       const patient: PatientChart = {
              dbId: metaData.id,
              name: metaData.name,
              dob: metaData.dob,
              age: metaData.age,
              gender: metaData.gender as Gender,
              height: metaData.height,
              weight: metaData.weight,
              time: {
                     hour: metaData.time_hour,
                     minutes: metaData.time_minute,
              },
              labDocURL: metaData.lab_doc_url,
              imagingURL: metaData.imaging_url,
              diagnosis: metaData.diagnosis,
              courseId: metaData.course_id,
              id: metaData.patient_bar_code,
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
       }

       if(studentId !== signInState.anonymousSignIn.valueOf()) {
              return await copyPatient(db, patient)
       }

       return patient
}

async function getPatientBasicInfo(db: PrismaClient, templatePatientBarCode: string) {
       const patient = await db.$queryRaw<{ id: number, name: string, dob: string, age: string, gender: string, height: string, weight: string, time_hour: number, time_minute: number, lab_doc_url: string, imaging_url: string, diagnosis: string, course_id: number, patient_bar_code: string }[]>`
                        SELECT id ,name, dob, age, gender, height, weight, time_hour, time_minute, lab_doc_url, imaging_url,
                               diagnosis, course_id, patient_bar_code 
                        FROM Patient WHERE patient_bar_code = ${templatePatientBarCode} LIMIT 1;`
       if (!patient || patient.length == 0) return null
       return patient[0] 

}

async function getAllergies(db: PrismaClient, patientId: number) {
       const data = await db.$queryRaw<{ name: string, reaction: string }[]>`
                        SELECT name, reaction FROM Allergy WHERE patient_id = ${patientId};`
       return data
}


async function getCustomOrders(db: PrismaClient, patientId: number): Promise<CustomOrder[]> {
       const data = await db.$queryRaw<{ orderKind: OrderKind, orderType: OrderType, time?: string, order: string }[]>`
                        SELECT order_kind as orderKind, order_type as orderType, time, order_text as "order" FROM Custom_Order WHERE patient_id = ${patientId};`
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
       const data = await db.$queryRaw<{ date: string, note: string, reportName: string, reportType: ReportType }[]>`
                        SELECT date, note, report_name as reportName, report_type as reportType FROM Note WHERE patient_id = ${patientId};`
       return data
}

async function getStudentReports(db: PrismaClient, patientId: number) {
       const data = await db.$queryRaw<{ setName: string, vitalName: string, time: string, value: string, date: string, reportType: ReportType }[]>`
                        SELECT set_name as setName, vital_name as vitalName, time, value, date, report_type as reportType FROM Student_Report WHERE patient_id = ${patientId};`
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
       const orders = await db.$queryRaw<{ orderId: number, id: number, concentration: string, route: string, frequency: Frequency, routine: Routine, PRNNote: string, notes: string, orderKind: OrderKind, orderType: OrderType, time: string, completed: boolean, hold_reason: string }[]>`
                        SELECT id as orderId, med_id as id, concentration, route, frequency, routine, prn_note as PRNNote, notes, order_kind as orderKind, order_type as orderType, time, completed, hold_reason FROM Med_Order WHERE patient_id = ${patientId};`
       const orderIds = orders.map(o => o.orderId)

       const marRecords = await db.$queryRaw<{ medOrderId: number, dose: string, hour: number, minute: number }[]>`
                        SELECT med_order_id as medOrderId, dose, hour, minutes FROM Mar_Record WHERE med_order_id in (${Prisma.join(orderIds)});
       `

       const medOrders: MedicationOrder[] = []
       for (const order of orders) {
              const medOrder: MedicationOrder = {
                     ...order,
                     mar: marRecords.filter(m => m.medOrderId == order.orderId).map(r => {
                            return {
                                   hour: r.hour,
                                   minutes: r.minute,
                                   dose: r.dose
                            } as MarRecord
                     })
              }
              medOrders.push(medOrder)
       }

       return medOrders
}



