import { type PrismaClient } from "@prisma/client";
import { type Session } from "next-auth";
import { makeMedOrderString, type CustomOrder, type MedicationOrder } from "~/core";
import { getPatientBasicInfoById } from "./getPatientDB";
import type { Response } from "~/types/protocolTypes";
import { addLog } from "../../logDB";

export async function addMedOrderToStudentPatient(db: PrismaClient, order: MedicationOrder, patientId: number, session: Session): Response<boolean> {
    try {
        const patient = await getPatientBasicInfoById(db, patientId)
        if (!patient) return { err: "Patient not found", data: null }
        if (patient.studentUID?.length === 0 || patient.studentUID !== session.user.id) return { err: "User is not logged in", data: null }
        if (patient.template) return { err: "Patient is not editable", data: null }

        await db.med_Order.create({
            data: {
                patient_id: patient.id,
                med_id: order.id,
                concentration: order.concentration,
                route: order.route,
                frequency: order.frequency,
                routine: order.routine,
                prn_note: order.PRNNote,
                notes: order.notes,
                order_kind: order.orderKind,
                order_type: order.orderType,
                time: order.time,
                completed: order.completed,
                hold_reason: order.holdReason,
                order_index: order.orderIndex,
                icd_10_code: order.icd10?.code,
                dispenseQuantity: order.dispenseQuantity,
                refills: order.refills

            }
        })
        const orderString = makeMedOrderString(order)
        const { err } = await addLog(db, patientId, `Added order ${orderString}`, session)
        if (err) return { err: err, data: null }

        return { err: null, data: true }
    } catch (e) {
        return { err: String(e), data: null }
    }
}



export async function addCustomOrderToStudentPatient(db: PrismaClient, order: CustomOrder, patientId: number, session: Session): Response<boolean> {
    try {
        const patient = await getPatientBasicInfoById(db, patientId)
        if (!patient) return { err: "Patient not found", data: null }
        if (patient.studentUID?.length === 0 || patient.studentUID !== session.user.id) return { err: "User is not logged in", data: null }
        if (patient.template) return { err: "Patient is not editable", data: null }

        await db.custom_Order.create({
            data: {
                patient_id: patient.id,
                order_kind: order.orderKind,
                order_type: order.orderType,
                time: order.time,
                order_index: order.orderIndex,
                order_text: order.order,
            }
        })

        const { err } = await addLog(db, patientId, `Added order ${order.order}`, session)
        if (err) return { err: err, data: null }

        return { err: null, data: true }
    } catch (e) {
        return { err: String(e), data: null }
    }
}