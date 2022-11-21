import { initializeApp } from "firebase/app";
import {
    addDoc, collection, DocumentReference, getDocs, getFirestore,
    limit, query, updateDoc, where, doc, getDoc, orderBy, deleteDoc,
     Firestore
     
} from "firebase/firestore";
import { findIndex } from "lodash";
import {PatientChart} from "nurse-o-core"
import { Cache } from "./Cache";
import { Medication, Settings } from "nurse-o-core";
import { Announcement, broadcastAnnouncement } from "./AnnouncementService";

export class Database {
    private static instance: Database;
    // private patient: PatientChart;
    private db: Firestore;

    private cache: Cache;
    private medListCached: boolean;
    private patientListCached: boolean;
    constructor(firebaseConfig: any) {
        initializeApp(firebaseConfig);
        this.db = getFirestore();
        // connectFirestoreEmulator(this.db, "localhost", 8080);
        this.cache = Cache.initialize();
        this.medListCached = false;
        this.patientListCached = false

    }


    async getMedication(id: string): Promise<Medication | null> {
        if (this.medListCached) {
            const cachedMeds = this.cache.getMeds();
            const medIndex = findIndex(cachedMeds, {id})
            if(medIndex > -1) return cachedMeds[medIndex]
        }
        
        console.log("getting medication from db")
        const q = query(collection(this.db, "medications"), where("id", "==", id), limit(1));
        const docs = (await getDocs(q)).docs
        if(docs.length === 0) return null;
        
        const medication = docs[0].data() as Medication
        this.cache.cacheMed(medication)
        return medication;
    }


    async getMedications(): Promise<Medication[]> {
        console.log("getting medications from db")
        const q = query(collection(this.db, "medications"));
        const docs = (await getDocs(q)).docs
        const medications = docs.map(doc => doc.data()) as Medication[];
        this.cache.cacheMultipleMeds(medications);
        return medications;
    }

    async addMedication(med:Medication): Promise<void> {
        const q = query(collection(this.db, "medications"), where("id", "==", med.id), limit(1));
        const docs = (await getDocs(q)).docs
        //check if med already exist
        if(docs.length > 0) {
            const doc = docs[0]
            await updateDoc(doc.ref,med)
        } else {
            await addDoc(collection(this.db,"medications"),med)
        }
    }

    async deleteMedication(med: Medication) {
        const q = query(collection(this.db, "medications"), where("id", "==", med.id), limit(1))
        const document = (await getDocs(q)).docs[0];
        const ref = document.ref;
        await deleteDoc(ref);
        this.medListCached = false;
    }


    async updateMedication(med: Medication) {
        const q = query(collection(this.db, "medications"), where("id", "==", med.id), limit(1))
        const document = (await getDocs(q)).docs[0];
        const ref = document.ref
        await updateDoc(ref,med)
    }


    async getSettings(): Promise<Settings> {
        const cachedSettings = this.cache.getSettings();
        if (cachedSettings) return cachedSettings;
        const settingsRef = doc(this.db, "settings", "settings");
        const document = await getDoc(settingsRef);
        const data = document.data() as Settings;
        this.cache.cacheSettings(data);
        console.log(data)
        return data;
    }

    async updateSettings(settings: Settings) {
        const settingsRef = doc(this.db, "settings", "settings");
        await updateDoc(settingsRef, settings);
    }

    async addTemplatePatient(patient: PatientChart) {
        this.patientListCached = false;
        await addDoc(collection(this.db, "templatePatients"), patient);
        broadcastAnnouncement("Patient Added", Announcement.success)
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

    async deleteTemplatePatient(patient: PatientChart) {
        const ref = await this.getTemplatePatientRef(patient);
        await deleteDoc(ref);
        this.patientListCached = false;
    }

    async updateTemplatePatient(oldPatient: PatientChart, newPatient: PatientChart) {
        const ref = await this.getTemplatePatientRef(oldPatient);
        const patient = { ...newPatient };
        this.patientListCached = false;
        await updateDoc(ref, patient);
        broadcastAnnouncement("Patient Updated", Announcement.success)
    }

    private async getTemplatePatientRef(patient: PatientChart): Promise<DocumentReference> {
        const patientQuery = query(collection(this.db, "templatePatients"), where("id", "==", patient.id), limit(1))
        const document = (await getDocs(patientQuery)).docs[0];
        return document.ref;
    }

    async getAdminList(): Promise<string[]> {
        const q = query(collection(this.db, "Admins"), limit(1));
        const doc = (await getDocs(q)).docs[0];
        if (doc) {
            return doc.data().adminEmails as string[]
        } else {
            return []
        }
    }

    async updateAdminList(updatedAdmins: string[]) {
        const q = query(collection(this.db, "Admins"), limit(1));
        const doc = (await getDocs(q)).docs[0];
        const data = {
            adminEmails: updatedAdmins
        }
        updateDoc(doc.ref,data);
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