import { type PrismaClient } from "@prisma/client";

export async function getListOfStudents(db: PrismaClient) {
    const studentsPatients = await db.$queryRaw<{ id: string, name: string, email: string }[]>`SELECT id, name, email FROM User;`
    return studentsPatients;
}