import { findIndex } from "lodash";
import {PatientChart} from "nurse-o-core"
import { Medication, Settings } from "nurse-o-core";

export class Cache {
    private cachedMeds: Medication[];
    private cachedSettings: Settings | null;
    private patients: PatientChart[];
    private static instance: Cache;
    private triggerCacheUpdateEvent:()=>void = ()=>null;
    private constructor() {
        this.cachedMeds = [];
        this.cachedSettings = null;
        this.patients = []
    }

    cacheMed(med: Medication) {
        //check if item already exist 
        const index = findIndex(this.cachedMeds, {id:med.id});
        if(index > -1) return;
        this.cachedMeds.push(med);
        this.triggerCacheUpdateEvent()
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
        this.triggerCacheUpdateEvent()
    }

    getSettings(): Settings | null{
        return this.cachedSettings;
    }

    cachePatient(patient:PatientChart) {
        const index = findIndex(this.patients, {id: patient.id});
        if(index > -1) return;
        this.patients.push(patient);
        this.triggerCacheUpdateEvent()
    }
    cacheMultiplePatients(patients: PatientChart[]) {
        for(const patient of patients) {
            this.cachePatient(patient);
        }
    }
    getPatients():PatientChart[] {
        return this.patients;
    }

    addOnCacheUpdateEventListener(fn:()=>void) {
        this.triggerCacheUpdateEvent = fn
    }


    public static getInstance(): Cache {
        if (Cache.instance) {
            return Cache.instance;
        } else {
            throw new Error("Can't get an instance without initializing first")
        }
    }

    public static initialize() {
        if (!Cache.instance) {
            Cache.instance = new Cache();
        }
        return Cache.instance;
    }

}