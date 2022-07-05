import { Settings } from "nurse-o-core";

export type MedicationLocation = {
    building: string,
    station: string,
    drawer: string,
}


export type MedicationModified = MedicationLocation & {
    id: string,
    name: string,
    narcoticCountNeeded: boolean
    medBarCode: string,
}


export type SettingsModified = Settings & {
    locations: MedicationLocation[]
}