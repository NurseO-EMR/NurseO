import { initializeApp } from "firebase/app";
import { addDoc, collection, DocumentReference, getDocs, getFirestore, limit, query, updateDoc, where } from "firebase/firestore/lite";
import { $error, $patient } from "./State";
import firebaseConfig from "./../firebaseConfig.json";
import { PatientChart } from "../Types/PatientProfile";
import { PatientNotFoundError } from "../Types/ErrorCodes";

export default class Database {
    private static instance: Database;
    private patient: PatientChart;
    private db;
    private patientDocRef: DocumentReference | null;
    private currentPatientID: number | null | undefined;

    constructor() {
        initializeApp(firebaseConfig);
        this.db = getFirestore();
        this.patient = null;
        this.patientDocRef = null;
        this.currentPatientID = null;
    }

    async getPatient(id: string): Promise<boolean> {
        if(this.currentPatientID === $patient.value?.id) return true;
        console.log("getting patient info from db")
        const q = query(collection(this.db,"patients"), where("id","==",id), limit(1))
        const doc = (await getDocs(q)).docs[0]
        console.log(doc)
        if(!doc) return false;
        const patientChart = doc.data() as PatientChart;
        this.patientDocRef = doc.ref;
        this.currentPatientID = patientChart?.id;
        $patient.next(patientChart)
        return true;
    }

    async updatePatient() {
        console.log(this.patientDocRef)
        if(this.patientDocRef === null ){
            $error.next(new PatientNotFoundError())
        } else {
            await updateDoc(this.patientDocRef, $patient.value);
        }
    }

    async addPatient(patient:PatientChart) {
        await addDoc(collection(this.db, "patients"), patient);
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