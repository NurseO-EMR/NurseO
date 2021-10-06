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
    flags: Flag[],
    immunizations: string[],

}


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

