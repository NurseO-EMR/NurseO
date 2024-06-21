import { type PrismaClient } from "@prisma/client";

export async function updateOrderHoldInfo(db: PrismaClient, orderId: number, holdReason: string | null) {
    const isTemplatePatient = await isOrderIsForTemplatePatient(db, orderId)
    console.log(isTemplatePatient)
    if (isTemplatePatient) return false
    const rowEffected = await db.$executeRaw`UPDATE Med_Order SET hold_reason = ${holdReason} WHERE id = ${orderId};`
    return rowEffected > 0
}

export async function addNote(db: PrismaClient, patientId: number, date: string, reportName: string, reportType: string, note: string) {
    if(!note) return;
    await db.note.create({
        data: {
            patient_Id: patientId,
            date,
            report_name: reportName,
            report_type: reportType,
            note
        },
    })
}


async function isOrderIsForTemplatePatient(db: PrismaClient, orderId: number) {
    const patients = await db.$queryRaw<{ template: boolean }[]>`SELECT Patient.template FROM Med_Order INNER JOIN Patient on Med_Order.patient_id = Patient.id WHERE Med_Order.id = ${orderId};`
    if (patients.length > 1) return true
    if (patients[0] === undefined) return true
    if (patients[0].template === true) return true
    else return false
}