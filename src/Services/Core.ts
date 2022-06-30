import { Settings } from "nurse-o-core";




export class MedicationModified {
    id = "";
    name = "";
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

export type SettingsModified = Settings & {
    locations: MedicationLocation[]
}

