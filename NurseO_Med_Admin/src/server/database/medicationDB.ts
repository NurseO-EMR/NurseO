import { type PrismaClient } from '@prisma/client';
import type { Medication, MedicationLocation } from '@nurse-o-core/index';

export async function getMedicationLocations(db: PrismaClient, medId: number, locationId: number): Promise<MedicationLocation[]> {
    const locations = await db.$queryRaw<{ drawer: string, slot: string, dose: string, type: string }[]>`
        SELECT drawer, slot, dose, type FROM Medication_Location_Information WHERE med_id = ${medId} AND location_id=${locationId};`

    const output: MedicationLocation[] = []
    for (const location of locations) {
        const l: MedicationLocation = {
            id: -1,
            barcode: "",
            ...location
        }
        output.push(l)
    }
    return output
}



export async function getAllMeds(db: PrismaClient): Promise<Medication[]> {
    const meds = await db.$queryRaw<{ id: number, brandName: string, generic_Name: string, dose: string, narcoticCountNeeded: boolean }[]>`
        SELECT id, brand_name as brandName, generic_Name as genericName, narcoti_count_needed as narcoticCountNeeded FROM Medication`

    const output: Medication[] = []
    for (const med of meds) {
        const m: Medication = {
            locations: [],
            ...med
        }
        output.push(m)
    }

    return output
}