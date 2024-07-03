import { Prisma, type PrismaClient } from "@prisma/client";
import { type ReportType, type Gender, type MedicationOrder, type PatientChart, type CustomOrder, type OrderKind, type OrderType, type MarRecord, type Frequency, type Routine } from '@nurse-o-core/index';
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
}


export async function getPatientById(db: PrismaClient, patientId: number): Promise<PatientChart | null> {
       console.log(patientId)
       const metaData = await getPatientBasicInfoById(db, patientId)
       if (!metaData) return null
       const patient = await getPatientChart(db, metaData)
       return patient
}



async function getPatientChart(db: PrismaClient, metaData: patientMetaData) {

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
       ]).catch((e)=>{
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
              time: {
                     hour: metaData.time_hour,
                     minute: metaData.time_minute,
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
       }

       return patient
}

async function getPatientBasicInfoById(db: PrismaClient, patientId: number) {
       const patient = await db.$queryRaw<patientMetaData[]>`
                        SELECT id ,name, dob, age, gender, height, weight, time_hour, time_minute, lab_doc_url, imaging_url,
                               diagnosis, course_id, patient_bar_code 
                        FROM Patient WHERE id = ${patientId} LIMIT 1;`
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
       const orders = await db.$queryRaw<{ orderId: number, id: number, concentration: string, route: string, frequency: Frequency, routine: Routine, PRNNote: string, notes: string, orderKind: OrderKind, orderType: OrderType, time: string, completed: boolean, holdReason: string }[]>`
                        SELECT id as orderId, med_id as id, concentration, route, frequency, routine, prn_note as PRNNote, notes, order_kind as orderKind, order_type as orderType, time, completed, hold_reason as holdReason FROM Med_Order WHERE patient_id = ${patientId};`
       if(orders.length === 0) return []
       
       const orderIds = orders.map(o => o.orderId)

       const marRecords = await db.$queryRaw<{ medOrderId: number, dose: string, hour: number, minute: number }[]>`
                        SELECT med_order_id as medOrderId, dose, hour, minute FROM Mar_Record WHERE med_order_id in (${Prisma.join(orderIds)});
       `

       const medOrders: MedicationOrder[] = []
       for (const order of orders) {
              order.completed = !!order.completed
              const medOrder: MedicationOrder = {
                     ...order,
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



