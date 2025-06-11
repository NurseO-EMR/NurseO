import { type PrismaClient, Prisma } from "@prisma/client";
import { type Session } from "next-auth";
import type { Response } from "~/types/protocolTypes";

export async function addLog(db: PrismaClient, patientId: number, activity: string, session: Session): Response<boolean> {
    try {
        await db.log.create({
            data: {
                patient_id: patientId,
                activity: activity,
                userUID: session.user.id,
                timestamp: new Date()
            }
        })
        return { err: null, data: true }
    } catch (e) {
        return { err: String(e), data: null }
    }

}



export async function getLogsForSpecificStudents(db: PrismaClient, studentUIDs: string[], timestampMarker: Date): Response<{ logId: number, userUID: string, activity: string, name: string, email: string, timestamp: Date }[]> {
    try {
        const data = await db.$queryRaw<{ logId: number, userUID: string, activity: string, name: string, email: string, timestamp: Date }[]>`
            SELECT Log.id as logId, Log.userUID, Log.activity, User.name, User.email, Log.timestamp
            FROM Log 
            INNER JOIN User ON User.id = Log.userUID
            WHERE Log.userUID IN (${Prisma.join(studentUIDs)})
            AND Log.timestamp > ${timestampMarker}
        `
        return { err: null, data: data }
    } catch (e) {
        return { err: String(e), data: null }
    }

}