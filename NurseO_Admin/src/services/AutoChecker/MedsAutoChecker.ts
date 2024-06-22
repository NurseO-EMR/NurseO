import { Medication } from "nurse-o-core"

export type MedBarCodeCombo = {
    barcode: string,
    med: Medication,
}


export function checkMeds(meds: Medication[]) {
    const map = makeAMapOfLocations(meds)
    const barcodeWithLocationsIssues = findDuplicateBarCodes(map)
    return barcodeWithLocationsIssues
}



function makeAMapOfLocations(meds: Medication[]) {
    const locations = new Map<string, MedBarCodeCombo[]>()
    for (const med of meds) {
        for (const location of med.locations) {
            const temp: MedBarCodeCombo = {
                barcode: location.barcode,
                med: med
            }
            if (locations.has(location.id)) {
                locations.get(location.id)?.push(temp)
            } else {
                const barcode = [temp]
                locations.set(location.id, barcode)
            }
        }
    }

    return locations
}


function findDuplicateBarCodes(locations: Map<string, MedBarCodeCombo[]>) {
    const medsWithLocationsIssues = []
    for (const location of locations) {
        const meds = location[1]
        for (const med of meds) {
            const filtered = meds.filter(m => m.barcode === med.barcode)
            if (filtered.length > 1) medsWithLocationsIssues.push(med)
        }
    }

    return medsWithLocationsIssues
}