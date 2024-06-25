import { PrismaClient } from "@prisma/client";

export async function getCourses(db:PrismaClient) {
    const courses = await db.$queryRaw<{id: number, name: string}[]>`SELECT id, name FROM Course`
    return courses;
}