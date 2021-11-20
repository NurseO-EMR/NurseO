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
    title: string,
    note: string
}

export enum OrderType {
    admission = "Admission",
    standing = "Standing",
    provider = "Provider",

}