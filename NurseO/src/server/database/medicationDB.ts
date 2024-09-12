import { type MedicationLocation, type Medication } from "~/core/index";
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

export async function getAllMedsWithLocationCount(db:PrismaClient) {
    const data = await db.$queryRaw<{id: number, brandName: string, genericName: string, narcoticCountNeeded: boolean, numberOfLocations: number}[]>`
    SELECT Medication.id, brand_name as brandName, generic_name as genericName, narcoti_count_needed as narcoticCountNeeded, COUNT(Medication_Location_Information.id) as numberOfLocations
    FROM Medication 
    LEFT JOIN Medication_Location_Information ON Medication.id = Medication_Location_Information.med_id
    GROUP BY Medication.id`

    data.forEach(d=>d.numberOfLocations = Number(d.numberOfLocations))
    return data
}


export async function deleteMed(db:PrismaClient, id: number) {
    const numberOfOrdersUsingIt = await db.$queryRaw<{numberOfOrders: number}[]>`
                                SELECT COUNT(1) as numberOfOrders FROM Medication
                                INNER JOIN Med_Order ON Medication.id = Med_Order.med_id
                                WHERE Medication.id = ${id}`
    if(numberOfOrdersUsingIt[0]?.numberOfOrders && numberOfOrdersUsingIt[0].numberOfOrders > 0) {
        return {state: "Error", message: `There are ${numberOfOrdersUsingIt[0].numberOfOrders} orders using this medication, please delete these orders before proceeding`}
    }

    await db.medication.delete({
        where: {
            id: id
        }
    }).catch(e=>{return {state: "Error", message: e as string}})

    return {state: "Success", message: `Medication Deleted`}

}

export async function getMedDetails(db:PrismaClient, medId: number) {
    const med = await db.$queryRaw<{id:number, brandName: string, genericName: string, narcoticCountNeeded: boolean}[]>`
    SELECT id, brand_name as brandName, generic_name as genericName, narcoti_count_needed as narcoticCountNeeded FROM Medication WHERE id = ${medId} LIMIT 1;`

    if(!med ?? med.length === 0) return;
    
    const locations = await db.$queryRaw<{id: number, drawer: string, barcode: string, dose: string, type: string, building: string, station: string, slot: string}[]>`
    SELECT Medication_Location_Information.id, drawer, barcode, dose, type, building, station, slot
    FROM Medication_Location_Information
    INNER JOIN Location ON Medication_Location_Information.location_id = Location.id
    WHERE Medication_Location_Information.med_id = ${medId};`

    return {med: med[0], locations}
}

export async function deleteMedLocation(db:PrismaClient, medLocationId: number) {
    await db.medication_Location_Information.delete({
        where: {
            id: medLocationId
        }
    })
}

export async function updateMedication(db:PrismaClient, medication:Medication) {
    const {id, brandName, genericName, narcoticCountNeeded} = medication
    const medRowsUpdated = await db.medication.update({
        data: {
            brand_name: brandName,
            generic_name: genericName,
            narcoti_count_needed: narcoticCountNeeded
        },
        where: {
            id: id,
        }
    })

    if(!!medRowsUpdated) {
        return {status: "Success", message: "Medication basic info was updated"}
    } else {
        return {status: "Error", message: "Medication basic info was not updated due to an error, please try again"}
    }
}

// used for the edit med page
export async function updateMedicationLocations(db:PrismaClient, locations:MedicationLocation[]) {
    const promises = []

    for(const location of locations) {
        const {barcode, dose, drawer, id, slot, type} = location
        const q = db.medication_Location_Information.update({
            data: {drawer, slot, type, dose, barcode},
            where: {id: id}
        })
        promises.push(q)
    }

    const transaction = await db.$transaction(promises)
    .then(()=>{return {status: "Success", message: "locations updated successfully"}})
    .catch(e=>{return {status: "Error", message: String(e)}})

    return transaction;
}

export async function addMedication(db:PrismaClient, medication: Medication) {
    const {brandName, genericName, narcoticCountNeeded} = medication
    if(!brandName || !genericName || !!narcoticCountNeeded) return -1

    const data = await db.medication.create({
        data: {
            brand_name: brandName,
            generic_name: genericName,
            narcoti_count_needed: narcoticCountNeeded
        }
    }).then((v)=>v.id).catch(e=>{console.log(e); return -1})

    return data
}

// used for the add location to med page
export async function addMedicationLocation(db:PrismaClient, medId: number, locationId: number, locationInfo: MedicationLocation) {
    const {drawer, slot, barcode, dose, type} = locationInfo
    return await db.medication_Location_Information.create({
        data: {drawer, slot, barcode, dose, type, med_id: medId, location_id: locationId}
    }).then(()=>{return {status: "Success", message: "location added successfully"}})
    .catch((e)=>{return {status: "Error", message: String(e)}})
}