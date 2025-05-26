import { type PrismaClient } from '@prisma/client';
import type { Response } from '~/types/protocolTypes';
export async function getICD10CodeByDescription(db: PrismaClient, description: string): Response<{ code: string, description: string }[]> {
    try {
        const q = `%${description}%`
        const data = await db.$queryRaw<{ code: string, description: string }[]>`SELECT code, description FROM ICD_10 WHERE description LIKE ${q} LIMIT 500;`
        return { err: null, data }
    } catch (e) {
        return { err: String(e), data: null }
    }

}   