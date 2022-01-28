import { getAuth } from 'firebase/auth';
import { initializeApp } from "firebase/app";
import {
    addDoc, collection, DocumentReference, getDocs, getFirestore,
    limit, query, updateDoc, where, setDoc, doc, getDoc, orderBy, deleteDoc
} from "firebase/firestore";
import { $error, $patient, $settings } from "./State";
import firebaseConfig from "./../firebaseConfig.json";
import { PatientChart } from "../Types/PatientProfile";
import { PatientNotFoundError } from "../Types/ErrorCodes";
import { Medication } from "../Types/Medications";
import { findIndex } from "lodash";
import { Settings } from "../Types/Settings";
import Cache from "./Cache";

export default class Database {
    private static instance: Database;
    // private patient: PatientChart;
    private db;
    private patientDocRef: DocumentReference | null;
    private currentPatientID: string | null | undefined;
    private cache: Cache;
    private medListCached: boolean;
    private patientListCached: boolean;

    constructor() {
        initializeApp(firebaseConfig);
        this.db = getFirestore();
        this.patientDocRef = null;
        this.currentPatientID = null;
        this.cache = new Cache();
        this.medListCached = false;
        this.patientListCached = false;
    }

    async getPatient(id: string): Promise<boolean> {
        const uid = getAuth().currentUser?.uid;
        let patientChart: PatientChart;
        if(!uid) return false;

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
            if(!templatePatientDoc) return false;
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

    async addMedication(medication: Medication) {
        this.medListCached = false;
        const medicationCollection = collection(this.db, "medications");
        const document = doc(medicationCollection);
        medication.id = document.id;
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

    async getMedication(medID: string): Promise<Medication | null> {
        //check if the med is cached 
        const cachedMeds = this.cache.getMeds();
        const medIndex = findIndex(cachedMeds, { id: medID });
        if (medIndex > -1) return cachedMeds[medIndex];

        console.log("getting medication info from db")
        const doc = await this.getMedicationDoc(medID);
        if (!doc) return null;
        const medication = doc.data() as Medication;
        this.cache.cacheMed(medication);
        return medication;
    }

    async getMedicationDoc(medID: string) {
        const q = query(collection(this.db, "medications"), where("id", "==", medID), limit(1))
        const doc = (await getDocs(q)).docs[0]
        return doc;
    }

    async updateMedication(med:Medication) {
        console.log(med.id)
        const doc = await this.getMedicationDoc(med.id);
        const ref = doc.ref;
        updateDoc(ref,{...med});
    }

    async removeMedication(medID: string) {
        const doc = await this.getMedicationDoc(medID);
        await deleteDoc(doc.ref);
        this.medListCached = false;
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

    async saveSettings(setting: Settings) {
        const settingsRef = doc(this.db, "settings", "settings");
        await setDoc(settingsRef, setting);
    }

    async updateSettings() {
        const settingsRef = doc(this.db, "settings", "settings");
        await updateDoc(settingsRef, $settings.value);
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
    }

    private async getTemplatePatientRef(patient: PatientChart): Promise<DocumentReference> {
        const patientQuery = query(collection(this.db, "templatePatients"), where("id", "==", patient.id), limit(1))
        const document = (await getDocs(patientQuery)).docs[0];
        return document.ref;
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