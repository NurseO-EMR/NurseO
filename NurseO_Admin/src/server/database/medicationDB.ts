import { type Medication } from "@nurse-o-core/index";
import { type PrismaClient } from "@prisma/client";

export async function getAllMeds(db:PrismaClient):Promise<Medication[]> {
    const meds = await db.$queryRaw<{id: number, brandName: string, genericName: string}[]>`SELECT id, brand_name as brandName, generic_name as genericName FROM Medication;`
    const output = [] as Medication[]

    for(const med of meds) {
        const m:Medication = {
            ...med,
            locations: [],
            narcoticCountNeeded: false
        }
        output.push(m)
    }

    return output;
}