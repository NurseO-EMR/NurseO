import { PrismaClient } from "@prisma/client";

export async function getCourses(db:PrismaClient) {
    const courses = await db.$queryRaw<{id: number, name: string}[]>`SELECT id, name FROM Course`
    return courses;
}

export async function getLocations(db:PrismaClient) {
    const locations = db.$queryRaw<{id: number, building: string, station: string}[]>`SELECT id, building, station FROM Location`
    return locations
}