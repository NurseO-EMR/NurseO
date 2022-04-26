export class MedicationModified {
    id: string = "";
    name: string = "";
    locations: MedicationLocation[] = [] 
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
    barcode: string
}


export const sampleMed: MedicationModified = {
    id: "!",
    name: "Acetaminophen",
    locations: [
        {
            building: "UHH",
            narcoticCountNeeded: false,
            station: "NurseA",
            supply: [
                {
                    name: "Acetaminophen tablet 800mg",
                    drawer: "D3",
                    barcode: "20",
                },
                {
                    name: "Acetaminophen tablet 600mg",
                    drawer: "D1 Pocket B",
                    barcode: "20",
                },
                {
                    name: "Acetaminophen tablet 325mg",
                    drawer: "D1 Pocket A",
                    barcode: "20",
                },
            ]
        }
    ]
}