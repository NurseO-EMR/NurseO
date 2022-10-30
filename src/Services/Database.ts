import { getAuth } from 'firebase/auth';
import { initializeApp } from "firebase/app";
import {
    addDoc, collection, DocumentReference, getDocs, getFirestore,
    limit, query, updateDoc, where, doc, getDoc, orderBy} from "firebase/firestore";
import { $error, $locationID, $patient, $settings } from "./State";
import firebaseConfig from "./../firebaseConfig.json";
import { Medication, Settings,PatientChart, PatientNotFoundError } from "nurse-o-core";
import { findIndex } from "lodash";
import Cache from "./Cache";

export default class Database {
    private static instance: Database;
    // private patient: PatientChart;
    private db;
    private patientDocRef: DocumentReference | null;
    private currentPatientID: string | null | undefined;
    private cache: Cache;
    private medListCached: boolean;

    constructor() {
        initializeApp(firebaseConfig);
        this.db = getFirestore();
        // connectFirestoreEmulator(this.db, 'localhost', 8080);
        this.patientDocRef = null;
        this.currentPatientID = null;
        this.cache = new Cache();
        this.medListCached = false;
    }

    async getPatient(id: string): Promise<boolean> {
        const uid = getAuth().currentUser?.uid;
        let patientChart: PatientChart;
        if (!uid) return false;

        if (this.currentPatientID === $patient.value?.id) return true;

        console.log("getting patient info from db")
        const q = query(collection(this.db, "patients"), where("id", "==", id), where("studentUID", "==", uid), limit(1))
        const doc = (await getDocs(q)).docs[0]
        if (doc) {
            this.patientDocRef = doc.ref;
            patientChart = doc.data() as PatientChart;
        } else {
            const templatePatientQuery = query(collection(this.db, "templatePatients"), where("id", "==", id), limit(1))
            const templatePatientDoc = (await getDocs(templatePatientQuery)).docs[0];
            if (!templatePatientDoc) return false;
            patientChart = templatePatientDoc.data() as PatientChart;
            patientChart.studentUID = uid;
            this.patientDocRef = await this.addPatient(patientChart);
            this.currentPatientID = patientChart?.id;

        };
        $patient.next(patientChart)
        return true;

    }

    async updatePatient() {
        if (this.patientDocRef === null) {
            $error.next(new PatientNotFoundError())
        } else {
            const patient = { ...$patient.value };
            await updateDoc(this.patientDocRef, patient);
        }
    }

    async addPatient(patient: PatientChart) {
        return await addDoc(collection(this.db, "patients"), patient);
    }


    async getMedicationById(medID: string): Promise<Medication | null> {
        const cachedMeds = this.cache.getMeds();
        const medIndex = findIndex(cachedMeds, { id: medID });
        if (medIndex > -1) return cachedMeds[medIndex];

        console.log("getting medication info from db")
        const doc = await this.getMedicationDoc(medID!);
        if (!doc) return null;
        const medication = doc.data() as Medication;
        this.cache.cacheMed(medication);
        return medication;
    }


    async getMedicationByBarcode(barcode:string): Promise<Medication | null>{
        const cachedMeds = this.cache.getMeds();
        const locationID = $locationID.value
        for(let i = 0; i < cachedMeds.length; i++) {
            const med = cachedMeds[i]
            const locations = med.locations;
            let barcodeIndex ;
            
            if(locationID) barcodeIndex = findIndex(locations, {id: locationID, barcode: barcode})
            else barcodeIndex = findIndex(locations, {barcode})
            if(barcodeIndex> -1) return cachedMeds[i];
        }

        
        console.log("getting medication info from db")
        const meds = await this.getMedications();
        for(const med of meds) {
            const locations = med.locations
            let barcodeIndex ;
            if(locationID) {
                barcodeIndex = findIndex(locations, {id: locationID, barcode: barcode})
                console.log("hello from hell")
            }
            else barcodeIndex = findIndex(locations, {barcode})
            if(barcodeIndex>-1) return med;
        }
        return null;
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


    async getMedicationDoc(medID: string) {
        let q;
        q = query(collection(this.db, "medications"), where("id", "==", medID), limit(1))
        const doc = (await getDocs(q)).docs[0]
        return doc;
    }



    async getSettings() {
        const cachedSettings = this.cache.getSettings();
        if (cachedSettings) return cachedSettings;
        const settingsRef = doc(this.db, "settings", "settings");
        const document = await getDoc(settingsRef);
        const data = document.data() as Settings;
        this.cache.cacheSettings(data);
        $settings.next(data);
        return data;
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




    public static getInstance(): Database {
        if (!Database.instance) {
            Database.instance = new Database();
        }
        return Database.instance;
    }

    public static initialize() {
        this.getInstance();
    }
}