import { Gender } from "./Gender"
import { StudentReport } from "./Report";
export type PatientChart = {
    id: string,
    name: string,
    dob: string,
    age: number,
    gender: Gender,
    height: number,
    weight: number,
    time: string,
    allergies: Allergy[],
    medicalIssues: MedicalIssue[],
    medicationOrders: MedicationOrder[],
    flags: Flag[],
    immunizations: string[],
    notes: Note[],
    studentReports: StudentReport[],
    availableReportSets: string[],
} | null;


export type MedicalIssue = {
    name: string,
    assessments: Assessment[],
    diagnosedDate: Date,
}

export type Assessment = {
    date: Date,
    summery: string
}

export type Flag = {
    name: string,
    reason:string
}

export type MedicationOrder = {
    id: string,
    concentration:string, 
    route: string,
    frequency: string,
    routine: string,
    PRNNote: string | null,
    notes: string
    mar: Time[],
    orderType: OrderType,
    doctorName: string
}

export type Time = {
    hour:number,
    minutes:number
}
export type Allergy = {
    name: string,
    reaction: string,
}


export type Note = {
    date: string,
    type: NursingNoteType,
    note: string
}

export enum OrderType {
    admission = "Admission",
    standing = "Standing",
    provider = "Provider",

}

export enum NursingNoteType {
    unknown = "",
    Nursing_Progress_Notes = "Nursing Progress Notes",
    Narrative_Nursing_Notes = "Narrative Nursing Notes",
    Problem_Oriented_Nursing_Notes = "Problem Oriented Nursing Notes",
    Charting_By_Exception_Nursing_Notes = "Charting By Exception Nursing Notes",
    Nursing_Admission_Assessment = "Nursing Admission Assessment",
    Nursing_Care_Plans = "Nursing Care Plans",
    Graphic_Sheets = "Graphic Sheets",
    Medication_Administration_Records = "Medication Administration Records",
}