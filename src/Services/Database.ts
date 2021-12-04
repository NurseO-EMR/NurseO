import { initializeApp } from "firebase/app";
import { addDoc, collection, DocumentReference, getDocs, getFirestore, limit, query, updateDoc, where, setDoc, doc, getDoc } from "firebase/firestore/lite";
import { $error, $patient, $settings } from "./State";
import firebaseConfig from "./../firebaseConfig.json";
import { PatientChart } from "../Types/PatientProfile";
import { PatientNotFoundError } from "../Types/ErrorCodes";
import { Medication } from "../Types/Medications";
import { findIndex } from "lodash";
import { Settings } from "../Types/Settings";

export default class Database {
    private static instance: Database;
    // private patient: PatientChart;
    private db;
    private patientDocRef: DocumentReference | null;
    private currentPatientID: string | null | undefined;
    private cachedMeds: Medication[];
    private cachedSettings: Settings | null;

    constructor() {
        initializeApp(firebaseConfig);
        this.db = getFirestore();
        this.cachedSettings = null;
        this.patientDocRef = null;
        this.currentPatientID = null;
        this.cachedMeds = [];
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
            await updateDoc(this.patientDocRef, $patient.value);
        }
    }

    async addPatient(patient:PatientChart) {
        await addDoc(collection(this.db, "patients"), patient);
    }

    async addMedication(medication: Medication) {
        await addDoc(collection(this.db, "medications"), medication);
    }

    async getMedication(medID: string): Promise<Medication|null> {
        //check if the med is cached 
        const medIndex = findIndex(this.cachedMeds, {id:medID});
        if(medIndex>-1) return this.cachedMeds[medIndex];

        console.log("getting medication info from db")
        const q = query(collection(this.db,"medications"), where("id","==",medID), limit(1))
        const doc = (await getDocs(q)).docs[0]
        if(!doc) return null;
        const medication = doc.data() as Medication;
        this.cachedMeds.push(medication);
        return medication;
    }

    async getSettings() {
        if(this.cachedSettings) return this.cachedSettings;
        const settingsRef = doc(this.db, "settings", "settings");
        const document = await getDoc(settingsRef);
        const data = document.data() as Settings;
        this.cachedSettings = data;
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