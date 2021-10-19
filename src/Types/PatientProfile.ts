import { Gender } from "./Gender"
import { StudentVitalsReport } from "./Vitals";
export type PatientChart = {
    id: number,
    name: string,
    dob: string,
    age: number,
    gender: Gender,
    height: number,
    weight: number,
    allergies: Allergy[],
    medicalIssues: MedicalIssue[],
    medications: Medication[],
    flags: Flag[],
    immunizations: string[],
    notes: Note[],
    studentVitals: StudentVitalsReport[],
    availableVitalSets: string[],
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
    visitReason:string,
    appearance: string, 
    vitalsSummery: string,
    assessment: string,
}
