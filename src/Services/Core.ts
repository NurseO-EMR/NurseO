import { Medication } from "nurse-o-core";

export class MedicationModified extends Medication {
    id: string = "";
    barcode: string = "";
    name: string = "";
    location: MedicationLocation[] = [] 
}


export type MedicationLocation = {
    building: string,
    station: string,
    supply: MedSupply[],
    narcoticCountNeeded: boolean,
}

export type MedSupply = {
    name: string, 
    drawer: string,
}


export const sampleMed: MedicationModified = {
    id: "!",
    barcode: "20",
    name: "Acetaminophen",
    location: [
        {
            building: "UHH",
            narcoticCountNeeded: false,
            station: "NurseA",
            supply: [
                {
                    name: "Acetaminophen tablet 800mg",
                    drawer: "D3"
                },
                {
                    name: "Acetaminophen tablet 600mg",
                    drawer: "D1 Pocket B"
                },
                {
                    name: "Acetaminophen tablet 325mg",
                    drawer: "D1 Pocket A"
                },
            ]
        }
    ]
}