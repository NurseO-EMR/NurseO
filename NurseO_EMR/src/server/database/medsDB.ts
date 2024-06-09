import { type Medication } from "@nurse-o-core/index";
import { type PrismaClient } from "@prisma/client";

export async function getMedicationById(db: PrismaClient, medId: number, locationId: number): Promise<Medication | null> {
    const med = await db.$queryRaw<{id: number, brandName: string, genericName: string, narcoticCountNeeded: boolean}[]>`
        SELECT id, brand_name as brandName, generic_name as genericName, narcoti_count_needed as narcoticCountNeeded FROM Medication WHERE id = ${medId} LIMIT 1;
    `

    const locations = await db.$queryRaw<{id: number, drawer: string, slot: string, barcode: string, dose: string, type: string}[]>`
    SELECT location_id as id, drawer, slot, barcode, dose, type FROM Medication_Location_Information WHERE med_id = ${medId} AND location_id = ${locationId};
    `

    if(!med || med.length === 0 || !med[0]) return null

    return {...med[0], locations}
}