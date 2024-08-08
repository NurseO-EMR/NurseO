import { type PrismaClient } from "@prisma/client";
import { type userRoles } from "~/types/userRoles";

export async function getUserRole(db:PrismaClient, userId: string) {
    const users = await db.$queryRaw<{role: userRoles}[]>`SELECT role FROM User WHERE id = ${userId};`
    return users[0]?.role
}