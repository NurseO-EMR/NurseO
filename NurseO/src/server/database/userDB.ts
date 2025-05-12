import { type PrismaClient, Prisma } from "@prisma/client";
import type { Response } from "~/types/protocolTypes";
import { type userRoles } from "~/types/userRoles";

export async function getUserRole(db: PrismaClient, userId: string) {
    const users = await db.$queryRaw<{ role: userRoles }[]>`SELECT role FROM User WHERE id = ${userId};`
    return users[0]?.role
}

export async function getStudentInfoFromUIDs(db: PrismaClient, userUIDs: string[]): Response<{ id: string, name: string, email: string, image: string }[]> {
    try {
        const data = await db.$queryRaw<{ id: string, name: string, email: string, image: string }[]>`SELECT id, name, email, image FROM User WHERE User.id IN (${Prisma.join(userUIDs)})`
        return { err: null, data }
    } catch (e) {
        return { err: String(e), data: null }
    }

}