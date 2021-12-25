import { initializeApp } from "firebase/app";
import { addDoc, collection, DocumentReference, getDocs, getFirestore, 
    limit, query, updateDoc, where, setDoc, doc, getDoc, orderBy } from "firebase/firestore/lite";
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

    constructor() {
        initializeApp(firebaseConfig);
        this.db = getFirestore();
        this.patientDocRef = null;
        this.currentPatientID = null;
        this.cache = new Cache();
        this.medListCached = false;
    }

    async getPatient(id: string): Promise<boolean> {
        if(this.currentPatientID === $patient.value?.id) return true;
        console.log("getting patient info from db")
        const q = query(collection(this.db,"patients"), where("id","==",id), limit(1))
        const doc = (await getDocs(q)).docs[0]
        if(!doc) return false;
        const patientChart = doc.data() as PatientChart;
        this.patientDocRef = doc.ref;
        this.currentPatientID = patientChart?.id;
        $patient.next(patientChart)
        return true;
    }

    async updatePatient() {
        if(this.patientDocRef === null ){
            $error.next(new PatientNotFoundError())
        } else {
            const patient = {...$patient.value};
            await updateDoc(this.patientDocRef, patient);
        }
    }

    async addPatient(patient:PatientChart) {
        await addDoc(collection(this.db, "patients"), patient);
    }

    async addMedication(medication: Medication) {
        await addDoc(collection(this.db, "medications"), medication);
    }

    async getMedications(): Promise<Medication[]> {
        if(this.medListCached) {
            const cachedMeds = this.cache.getMeds();
            return cachedMeds;
        }
        console.log("getting medications from db")
        const q = query(collection(this.db,"medications"), orderBy("name"));
        const docs = (await getDocs(q)).docs
        const medications = docs.map(doc=>doc.data()) as Medication[];
        this.cache.cacheMultipleMeds(medications);
        return medications;
    }

    async getMedication(medID: string): Promise<Medication|null> {
        //check if the med is cached 
        const cachedMeds = this.cache.getMeds();
        const medIndex = findIndex(cachedMeds, {id:medID});
        if(medIndex>-1) return cachedMeds[medIndex];

        console.log("getting medication info from db")
        const q = query(collection(this.db,"medications"), where("id","==",medID), limit(1))
        const doc = (await getDocs(q)).docs[0]
        if(!doc) return null;
        const medication = doc.data() as Medication;
        this.cache.cacheMed(medication);
        return medication;
    }

    async getSettings() {
        const cachedSettings = this.cache.getSettings();
        if(cachedSettings) return cachedSettings;
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

    async addTemplatePatient(patient:PatientChart) {
        await addDoc(collection(this.db, "templatePatients"), patient);
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