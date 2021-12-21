import { findIndex } from "lodash";
import { Medication } from "../Types/Medications";
import { Settings } from "../Types/Settings";

export default class Cache {
    private cachedMeds: Medication[];
    private cachedSettings: Settings | null;

    constructor() {
        this.cachedMeds = [];
        this.cachedSettings = null;
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
}