import { type PrismaClient } from "@prisma/client";
import { type Session } from "next-auth";
import type { Response } from "~/types/protocolTypes";

export async function addLog(db: PrismaClient, patientId: number, activity: string, session: Session): Response<boolean> {
    try {
        await db.log.create({
            data: {
                patient_id: patientId,
                activity: activity,
                userUID: session.user.id
            }
        })
        return { err: null, data: true }
    } catch (e) {
        return { err: String(e), data: null }
    }

}