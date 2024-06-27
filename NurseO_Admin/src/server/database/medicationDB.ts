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