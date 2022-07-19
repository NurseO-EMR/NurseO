export type Medication = {
    id: string,
    name: string,
    narcoticCountNeeded: boolean
    locations: MedicationLocation[]
}


export type MedicationLocation = {
    id: string,
    drawer: string,
    slot: string,
    barcode: string,
    dose: string,
    type: string,
}


export type LocationDefinition = {
    id: string,
    building: string,
    station: string,
}