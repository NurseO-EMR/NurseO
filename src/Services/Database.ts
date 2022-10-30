import { getAuth } from '@firebase/auth';
import { initializeApp } from "@firebase/app";
import {
    addDoc, collection, getDocs, getFirestore,
    limit, query, where, doc, getDoc, Firestore, orderBy
} from "@firebase/firestore";
import { findIndex } from "lodash";
import {PatientChart, Medication, Settings} from "nurse-o-core"
import { Cache } from './Cache';

import {$patient} from "./State"

export class Database {
    // eslint-disable-next-line no-use-before-define
    private static instance: Database;
    private db: Firestore;
    private currentPatientID: string | null | undefined;
    private cache: Cache;
    private medListCached: boolean;
    private patientListCached: boolean;


    constructor(firebaseConfig: any) {
        initializeApp(firebaseConfig);
        this.db = getFirestore();
        // connectFirestoreEmulator(this.db, "localhost", 8080);
        this.currentPatientID = null;
        this.cache = new Cache();
        this.medListCached = false;
        this.patientListCached = false

    }

    async getPatient(id: string): Promise<boolean> {
        const uid = getAuth().currentUser?.uid;
        let patientChart: PatientChart;
        if (!uid) return false;

        if (this.currentPatientID === $patient.value?.id && this.currentPatientID === id) return true;

        console.log("getting patient info from db")
        const q = query(collection(this.db, "patients"), where("id", "==", id), where("studentUID", "==", uid), limit(1))
        const doc = (await getDocs(q)).docs[0]
        if (doc) {
            patientChart = doc.data() as PatientChart;
        } else {
            const templatePatientQuery = query(collection(this.db, "templatePatients"), where("id", "==", id), limit(1))
            const templatePatientDoc = (await getDocs(templatePatientQuery)).docs[0];
            if (!templatePatientDoc) return false;
            patientChart = templatePatientDoc.data() as PatientChart;
            patientChart.studentUID = uid;
            this.currentPatientID = patientChart?.id;

        }
        $patient.next(patientChart)
        console.log(patientChart)
        return true;

    }
    
    async addPatient(patient: PatientChart) {
        return await addDoc(collection(this.db, "patients"), patient);
    }

    async getMedication(id: string): Promise<Medication | null> {
        const cachedMeds = this.cache.getMeds();
        const medIndex = findIndex(cachedMeds, { id })
        if (medIndex > -1) return cachedMeds[medIndex]


        console.log("getting medication from db")
        const q = query(collection(this.db, "medications"), where("id", "==", id), limit(1));
        const docs = (await getDocs(q)).docs
        if (docs.length === 0) return null;

        const medication = docs[0].data() as Medication
        this.cache.cacheMed(medication)
        return medication;
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
        this.medListCached = true
        return medications;
    }



    async getSettings() {
        const cachedSettings = this.cache.getSettings();
        if (cachedSettings) return cachedSettings;
        const settingsRef = doc(this.db, "settings", "settings");
        const document = await getDoc(settingsRef);
        const data = document.data() as Settings;
        this.cache.cacheSettings(data);
        return data;
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