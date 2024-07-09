import type { PatientChart } from "@nurse-o-core/index";
import { type PrismaClient } from "@prisma/client";

export async function getPatientList(db:PrismaClient) {
    const patients = await db.$queryRaw<{id: number, name: string, dob: string, barcode: string, courseName: string, courseId: number}[]>`
        SELECT Patient.id, Patient.name, dob, patient_bar_code as barcode, Course.name as courseName, Course.id as courseId
        FROM Patient 
        LEFT JOIN Course ON Course.id = Patient.course_id
        WHERE template = true;
    `
    return patients
}

export async function deletePatient(db:PrismaClient, patientId: number) {
    const orders = await db.$queryRaw<{id: number}[]>`SELECT id FROM Med_Order WHERE patient_id = 354`
    const orderNumbers = orders.map(o=>o.id)

    const data = await db.$transaction([
        db.allergy.deleteMany({where: {patient_id: patientId}}),
        db.custom_Order.deleteMany({where: {patient_id: patientId}}),
        db.social_History.deleteMany({where: {patient_id: patientId}}),
        db.medical_History.deleteMany({where: {patient_id: patientId}}),
        db.note.deleteMany({where: {patient_id: patientId}}),
        db.student_Report.deleteMany({where: {patient_id: patientId}}),
        db.flag.deleteMany({where: {patient_id: patientId}}),
        db.immunization.deleteMany({where: {patient_id: patientId}}),
        db.mar_Record.deleteMany({where: {med_order_id: {in: orderNumbers}}}),
        db.med_Order.deleteMany({where: {patient_id: patientId}}),
        db.patient.deleteMany({where: {id: patientId}}),
    ])
    
    return data.map(d=>d.count).reduce((a,b)=>a+b) > 0
}

export async function addPatientWMetaDataOnly(db: PrismaClient, patient:PatientChart) {
    const data =  await db.patient.create({
        data: {
            name: patient.name,
            dob: patient.dob,
            gender: patient.gender,
            height: patient.height,
            weight: patient.weight,
            diagnosis: patient.diagnosis,
            age: "",
            patient_bar_code: "",
            template: true,
            time_hour: 0,
            time_minute: 0,
            course_id: 1,

        }
    })

    return data.id
}
