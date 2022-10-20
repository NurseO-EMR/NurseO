import { groupBy } from "lodash"
import { PatientChart } from "nurse-o-core"
import { Cache } from "../Cache"
export type PatientBarCodeCombo = {
    barcode: string,
    patient: PatientChart,
}

export function checkPatients(){
    const cache = Cache.getInstance()
    const patients = cache.getPatients()
    const patientsWIssues:PatientBarCodeCombo[] = []
    for(const patient of patients) {
        const filtered = patients.filter(p=>p.id === patient.id)
        console.log(patient.id)
        if(filtered.length > 1) {
            const temp:PatientBarCodeCombo = {
                barcode: patient.id,
                patient: patient
            }
            patientsWIssues.push(temp)
        }
    }

    return groupBy(patientsWIssues, "barcode")
}