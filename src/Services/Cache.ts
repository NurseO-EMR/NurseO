import { findIndex } from "lodash";
import {Medication, PatientChart, Settings} from "nurse-o-core"

export class Cache {
    private  cachedMeds: Medication[];
    private  cachedSettings: Settings | null;
    private  patients: PatientChart[];

    constructor() {
        this.cachedMeds = [];
        this.cachedSettings = null;
        this.patients = []
    }

    cacheMed(med: Medication) {
        //check if item already exist 
        const index = findIndex(this.cachedMeds, {id:med.id});
        if(index > -1) return;
        this.cachedMeds.push(med);
    }

    cacheMultipleMeds(meds: Medication[]) {
        for(const med of meds) {
            this.cacheMed(med);
        }
    }

    getMeds():Medication[] {
        return this.cachedMeds;
    }

    cacheSettings(settings: Settings) {
        this.cachedSettings = settings;
    }

    getSettings(): Settings | null{
        return this.cachedSettings;
    }

    cachePatient(patient:PatientChart) {
        const index = findIndex(this.patients, {id: patient.id});
        if(index > -1) return;
        this.patients.push(patient);
    }

    getPatients():PatientChart[] {
        return this.patients;
    }

    cacheMultiplePatients(patients: PatientChart[]) {
        for(const patient of patients) {
            this.cachePatient(patient);
        }
    }
}