import { initializeApp } from "firebase/app";
import {
    addDoc, collection, DocumentReference, getDocs, getFirestore,
    limit, query, updateDoc, where, doc, getDoc, orderBy, deleteDoc,
    DocumentData, QueryDocumentSnapshot, Firestore, connectFirestoreEmulator
} from "firebase/firestore";
import { findIndex } from "lodash";
import {
    $settings, PatientChart, Medication
} from "nurse-o-core"
import { Cache } from "./Cache";
import { MedicationLocation, SettingsModified as Settings } from "./Core";

export class Database {
    private static instance: Database;
    // private patient: PatientChart;
    private db: Firestore;
    private patientDocRef: DocumentReference | null;
    private currentPatientID: string | null | undefined;
    private cache: Cache;
    private medListCached: boolean;
    private patientListCached: boolean;

    constructor(firebaseConfig: any) {
        initializeApp(firebaseConfig);
        this.db = getFirestore();
        connectFirestoreEmulator(this.db, "localhost", 8080);
        this.patientDocRef = null;
        this.currentPatientID = null;
        this.cache = new Cache();
        this.medListCached = false;
        this.patientListCached = false

    }

    // async addPatient(patient: PatientChart) {
    //     return await addDoc(collection(this.db, "patients"), patient);
    // }

    async addMedication(medication: Medication) {
        this.medListCached = false;
        const medicationCollection = collection(this.db, "medications");
        console.log(medicationCollection)
        // const document = doc(medicationCollection);
        // medication.id = document.id;
        await addDoc(collection(this.db, "medications"), medication);
    }

    async getMedications(): Promise<Medication[]> {
        if (this.medListCached) {
            const cachedMeds = this.cache.getMeds();
            return cachedMeds;
        }
        console.log("getting medications from db")
        const q = query(collection(this.db, "medications"), orderBy("name"));
        const docs = (await getDocs(q)).docs
        const medications = docs.map(doc => doc.data()) as Medication[];
        this.cache.cacheMultipleMeds(medications);
        return medications;
    }

    // async getMedication(medID?: string, barcode?: string): Promise<Medication | null> {
    //     //check if the med is cached 
    //     const cachedMeds = this.cache.getMeds();
    //     let medIndex;
    //     if (medID) medIndex = findIndex(cachedMeds, { id: medID });

    //     else if (barcode) medIndex = findIndex(cachedMeds, { barcode: barcode });
    //     else throw new Error("Please provide either medID or barcode ID")
    //     if (medIndex > -1) return cachedMeds[medIndex];

    //     console.log("getting medication info from db")
    //     let doc: QueryDocumentSnapshot<DocumentData>;

    //     if (medID) {
    //         doc =  await this.getMedicationDoc(medID) as QueryDocumentSnapshot<DocumentData>;
    //     } else if (barcode) {
    //         doc = await this.getMedicationDoc(undefined, barcode) as QueryDocumentSnapshot<DocumentData>;
    //     } else {
    //         throw new Error("Please provide either medID or barcode ID")
    //     }

    //     if (!doc) return null;
    //     const medication = doc.data() as Medication;
    //     this.cache.cacheMed(medication);
    //     return medication;
    // }


    // private async getMedicationDoc(medID?: string, barcode?: string) {
    //     let q;
    //     if (medID) {
    //         q = query(collection(this.db, "medications"), where("id", "==", medID), limit(1))
    //     } else if (barcode) {
    //         q = query(collection(this.db, "medications"), where("barcode", "==", barcode), limit(1))
    //     } else {
    //         throw new Error("Please provide either medID or barcode ID")
    //     }
    //     const doc = (await getDocs(q)).docs[0]
    //     return doc;
    // }

    // async updateMedication(med: Medication) {
    //     console.log(med.id)
    //     const doc = await this.getMedicationDoc(med.id);
    //     const ref = doc.ref;
    //     updateDoc(ref, { ...med });
    // }

    // async removeMedication(medID: string) {
    //     const doc = await this.getMedicationDoc(medID);
    //     await deleteDoc(doc.ref);
    //     this.medListCached = false;
    // }



    async getSettings(): Promise<Settings> {
        const cachedSettings = this.cache.getSettings();
        if (cachedSettings) return cachedSettings;
        const settingsRef = doc(this.db, "settings", "settings");
        const document = await getDoc(settingsRef);
        const data = document.data() as Settings;
        this.cache.cacheSettings(data);
        $settings.next(data);
        console.log(data)
        return data;
    }

    // async saveSettings(setting: Settings) {
    //     const settingsRef = doc(this.db, "settings", "settings");
    //     await setDoc(settingsRef, setting);
    // }

    async updateSettings(settings: Settings) {
        const settingsRef = doc(this.db, "settings", "settings");
        await updateDoc(settingsRef, settings);
    }





    async addTemplatePatient(patient: PatientChart) {
        this.patientListCached = false;
        await addDoc(collection(this.db, "templatePatients"), patient);
    }

    async getTemplatePatients(): Promise<PatientChart[]> {
        if (this.patientListCached) {
            const patients = this.cache.getPatients();
            return patients;
        }
        console.log("getting template patients from db")
        const q = query(collection(this.db, "templatePatients"), orderBy("name"));
        const docs = (await getDocs(q)).docs
        if (docs.length === 0) return [];
        const patients = docs.map(doc => doc.data()) as PatientChart[];
        this.cache.cacheMultiplePatients(patients);
        this.patientListCached = true;
        return patients;
    }

    // async deleteTemplatePatient(patient: PatientChart) {
    //     const ref = await this.getTemplatePatientRef(patient);
    //     await deleteDoc(ref);
    //     this.patientListCached = false;
    // }

    // async updateTemplatePatient(oldPatient: PatientChart, newPatient: PatientChart) {
    //     const ref = await this.getTemplatePatientRef(oldPatient);
    //     const patient = { ...newPatient };
    //     this.patientListCached = false;
    //     await updateDoc(ref, patient);
    // }

    // private async getTemplatePatientRef(patient: PatientChart): Promise<DocumentReference> {
    //     const patientQuery = query(collection(this.db, "templatePatients"), where("id", "==", patient.id), limit(1))
    //     const document = (await getDocs(patientQuery)).docs[0];
    //     return document.ref;
    // }

    // async getAdminList(): Promise<string[]> {
    //     const q = query(collection(this.db, "Admins"), limit(1));
    //     const doc = (await getDocs(q)).docs[0];
    //     if (doc) {
    //         return doc.data().adminEmails as string[]
    //     } else {
    //         return []
    //     }
    // }

    // async updateAdminList(updatedAdmins: string[]) {
    //     const q = query(collection(this.db, "Admins"), limit(1));
    //     const doc = (await getDocs(q)).docs[0];
    //     const data = {
    //         adminEmails: updatedAdmins
    //     }
    //     updateDoc(doc.ref,data);
    // }


    async addLocation(location: MedicationLocation) {
        const settings = await this.getSettings();
        if (!settings.locations) settings.locations = []
        settings.locations.push(location);
        await this.updateSettings(settings);
    }

    async getLocations(): Promise<MedicationLocation[]> {
        const settings = await this.getSettings();
        if(settings.locations === undefined) return [];
        return settings.locations;
    }






    public static getInstance(): Database {
        if (Database.instance) {
            return Database.instance;
        } else {
            throw new Error("Can't get an instance without initializing first")
        }
    }

    public static initialize(firebaseConfig: any) {
        if (!Database.instance) {
            Database.instance = new Database(firebaseConfig);
        }
        return Database.instance;
    }
}