export type Medication = {
    id: number,
    brandName?: string,
    genericName?: string,
    narcoticCountNeeded: boolean
    locations: MedicationLocation[]
}


export type MedicationLocation = {
    id: number,
    drawer: string,
    slot: string,
    barcode: string,
    dose: string,
    type: string,
}


export type LocationDefinition = {
    id: number,
    building: string,
    station: string,
    // courseIds: string[]
}