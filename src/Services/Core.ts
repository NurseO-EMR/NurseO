import { Settings } from "nurse-o-core";

export type MedicationLocation = {
    id: string,
    drawer: string,
    slot: string,
    barcode: string,
    dose: string,
    type: string,
}


export type MedicationModified = {
    id: string,
    name: string,
    narcoticCountNeeded: boolean
    locations: MedicationLocation[]
}


export type LocationDefinition = {
    id: string,
    building: string,
    station: string,
}


export type SettingsModified = Settings & {
    locations: LocationDefinition[]
}