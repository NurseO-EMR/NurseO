import { type PrismaClient } from "@prisma/client";

export async function updateOrderHoldInfo(db: PrismaClient, orderId: number, holdReason: string | null) {
    const patientCanBeUpdated = await isOrderIsForTemplatePatient(db, orderId)
    if(!patientCanBeUpdated) return 0
    const rowEffected = await db.$executeRaw`UPDATE Med_Order SET hold_reason = ${holdReason} WHERE id = ${orderId};`
    return rowEffected > 0 ? 1 : 0
}


async function isOrderIsForTemplatePatient(db: PrismaClient, orderId: number) {
    const patients = await db.$queryRaw<{template: boolean}[]>`SELECT Patient.template FROM Med_Order INNER JOIN Patient on Med_Order.patient_id = Patient.id WHERE Med_Order.id = ${orderId};`
    if(patients.length > 1) return true
    if(patients[0] === undefined) return true
    if(patients[0].template === true) return true
    else return false
}