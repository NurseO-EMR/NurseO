import { Gender } from "./Gender"
export type PatientChart = {
    name: string,
    dob: Date,
    age: number,
    gender: Gender,
    height: number,
    weight: number,
    allergies: string[],
    medicalIssues: MedicalIssue[],
    medications: Medication[],
    flags: Flag[],
    immunizations: string[],

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

export type Flag = "DNR" | "NPO";

export type Medication = {
    name:string,
    concentration:string, 
    route: string,
    frequency: string,
    routine: string,
    PRNNote: string | null,
    notes: string
    mar: Time[],
    
}

export type Time = Array<number>;



