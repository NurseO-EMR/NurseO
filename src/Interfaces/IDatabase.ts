import { Medication } from "../Types/Medications";
import { PatientChart } from "../Types/PatientProfile";
import { Settings } from "../Types/Settings";

export interface IDatabase {

    constructor(firebaseConfig: any);

    getPatient(id: string): Promise<boolean>


    getMedication(medID?: string, barcode?: string): Promise<Medication | null>;


    getSettings(): Promise<Settings>

    updatePatient(): Promise<void>


    getTemplatePatients(): Promise<PatientChart[]>;

}