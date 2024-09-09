import { Frequency, OrderKind, OrderType, Routine, type Medication } from "@nurse-o-core/index";
import { type PrismaClient } from "@prisma/client";


type dbMed = { id: number, brandName: string, genericName: string, narcoticCountNeeded: boolean }

export async function getMedicationById(db: PrismaClient, medId: number, locationId: number): Promise<Medication | null> {
    const med = await db.$queryRaw<dbMed[]>`
        SELECT id, brand_name as brandName, generic_name as genericName, narcoti_count_needed as narcoticCountNeeded FROM Medication WHERE id = ${medId} LIMIT 1;
    `
    if (!med || med.length === 0 || !med[0]) return null

    const locations = await getMedLocationInfo(db, medId, locationId)
    

    return { ...med[0], locations }
}


export async function getMedicationByBarcode(db:PrismaClient, medBarcode: string, locationId: number): Promise<Medication | null> {
    const med = await db.$queryRaw<dbMed[]>`SELECT Medication.id, brand_name as brandName, generic_name as genericName, narcoti_count_needed as narcoticCountNeeded
                             FROM Medication_Location_Information
                             INNER JOIN Medication on Medication_Location_Information.med_id = Medication.id
                             WHERE location_id = ${locationId} AND barcode = ${medBarcode} LIMIT 1;`

    if (!med || med.length === 0 || !med[0]) return null

    const locations = await getMedLocationInfo(db, med[0].id, locationId)


    return {...med[0], locations}
}

export async function addMarEntry(db:PrismaClient, orderId: number, dose: string, hour: number, minute: number) {
    console.log("orderid is " + orderId)
    const rowsEffected = await db.$executeRaw`INSERT INTO Mar_Record(med_order_id, dose, hour, minute) VALUES (${orderId}, ${dose}, ${hour}, ${minute})`
    return rowsEffected > 0
}

export async function addMarWithNoOrder(db:PrismaClient, medId: number, dose: string, hour: number, minute: number, patientId: number) {
    const order = await db.med_Order.create({
        data: {
            patient_id: patientId,
            med_id: medId,
            concentration: "",
            frequency: Frequency.NA,
            notes: "",
            order_kind: OrderKind.NA,
            order_type: OrderType.NA,
            prn_note: "",
            route: "",
            routine: Routine.NA,
        },
        select: {
            id: true
        }
    })

    const added = await addMarEntry(db, order.id, dose, hour, minute)

    return {success: added, orderId: order.id}
}


async function getMedLocationInfo(db: PrismaClient, medId: number, locationId: number) {
    const locations = await db.$queryRaw<{ id: number, drawer: string, slot: string, barcode: string, dose: string, type: string }[]>`
    SELECT location_id as id, drawer, slot, barcode, dose, type FROM Medication_Location_Information WHERE med_id = ${medId} AND location_id = ${locationId};`
    return locations
}