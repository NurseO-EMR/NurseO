import { type PrismaClient, Prisma } from "@prisma/client";
import { type Session } from "next-auth";
import { LogTypes } from "~/types/logTypes";
import type { Response } from "~/types/protocolTypes";

export async function addLog(db: PrismaClient, patientId: number | null, activity: string, session: Session, logType: LogTypes, ipAddress: string | null): Response<boolean> {
    try {
        if (!ipAddress && logType === LogTypes.Info) throw new Error("Issue with the logging system")

        await db.log.create({
            data: {
                patient_id: patientId,
                activity: activity,
                userUID: session.user.id,
                timestamp: new Date(),
                log_type: logType,
                ip_address: ipAddress
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