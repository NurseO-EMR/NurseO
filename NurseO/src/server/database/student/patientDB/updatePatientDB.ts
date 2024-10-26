import { type PrismaClient } from "@prisma/client";
import { type MedicalHistory } from "~/core";

export async function updateOrderHoldInfo(db: PrismaClient, orderId: number, holdReason: string | null) {
    const isTemplatePatient = await isOrderIsForTemplatePatient(db, orderId)
    if (isTemplatePatient) return false
    const rowEffected = await db.$executeRaw`UPDATE Med_Order SET hold_reason = ${holdReason} WHERE id = ${orderId} LIMIT 1;`
    return rowEffected > 0
}

export async function addNote(db: PrismaClient, patientId: number, date: string, note: string) {
    if (!note) return;
    const isTemplate = await checkIfPatientIdIsTemplatePatient(db, patientId)
    if (isTemplate) return;

    await db.note.create({
        data: {
            patient_id: patientId,
            date,
            note,
        },
    })
}

export async function updateChiefCompliant(db: PrismaClient, patientId: number, chiefCompliant: string) {
    await db.$executeRaw`UPDATE Patient SET chief_complaint = ${chiefCompliant} WHERE id = ${patientId} AND template = false LIMIT 1; `
}

export async function addMedicalHistory(db: PrismaClient, patientId: number, medicalHistory: MedicalHistory) {
    const isTemplatePatient = await checkIfPatientIdIsTemplatePatient(db, patientId)
    if (isTemplatePatient) return;

    const { date, notes, title } = medicalHistory
    await db.$queryRaw`INSERT INTO Medical_History (date, title, notes, patient_id) VALUES (${date}, ${title}, ${notes}, ${patientId});`
}

async function isOrderIsForTemplatePatient(db: PrismaClient, orderId: number) {
    const patients = await db.$queryRaw<{ template: boolean }[]>`SELECT Patient.template FROM Med_Order INNER JOIN Patient on Med_Order.patient_id = Patient.id WHERE Med_Order.id = ${orderId};`
    if (patients.length > 1) return true
    if (patients[0] === undefined) return true
    if (patients[0].template === true) return true
    else return false
}

async function checkIfPatientIdIsTemplatePatient(db: PrismaClient, patientId: number): Promise<boolean> {
    const data = await db.$queryRaw<{ template: boolean }[]>`SELECT Patient.template FROM Patient WHERE Patient.id = ${patientId} LIMIT 1;`
    if (data.length === 0) return false;
    if (!data[0]) return false;
    return data[0].template
}
