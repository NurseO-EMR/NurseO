import { Gender } from "./Gender"
import { ReportType, StudentReport } from "./Report";
export type PatientChart = {
    id: string,
    name: string,
    dob: string,
    age: string,
    gender: Gender,
    height: string,
    weight: string,
    time: string,
    allergies: Allergy[],
    medicalIssues: MedicalIssue[],
    medicationOrders: MedicationOrder[],
    customOrders?: [],
    flags: Flag[],
    immunizations: string[],
    studentReports: StudentReport[],
    notes: Note[]
} | null;


export class MedicalIssue {
    name: string = ""
    assessment: string = ""
    diagnosedDate:Date = new Date()
}

export type Assessment = {
    date: Date,
    summery: string
}

export class Flag {
    name: string = ""
    reason:string = ""
}

export enum OrderKind {
    med = "med",
    custom = "custom",
}


export enum OrderType {
    admission = "Admission",
    standing = "Standing",
    provider = "Provider",
    NA = ""
}

export enum Routine {
    PRN = "PRN",
    NOW = "NOW",
    Scheduled = "Scheduled",
    NA = "",
}

export enum Frequency {
    qd = "qd",
    q15m = "q15m",
    q30m = "q30m",
    q1hr = "q1hr",
    q2hr = "q2hr",
    q3hr = "q3hr",
    q4hr = "q4hr",
    q5hr = "q5hr",
    q6hr = "q6hr",
    q7hr = "q7hr",
    q8hr = "q8hr",
    q9hr = "q9hr",
    q10hr = "q10hr",
    q11hr = "q11hr",
    q12hr = "q12hr",
    qhs = "qhs",
    NA = "",
}

export type MedicationOrder  = {
    orderKind: OrderKind;
    id: string;
    concentration:string;
    route: string;
    frequency: Frequency;
    routine: Routine;
    PRNNote: string | null;
    notes: string;
    mar: Time[];
    orderType: OrderType;
}

export type Time = {
    hour:number,
    minutes:number
}
export class Allergy {
    name: string = ""
    reaction: string = ""
}

export type Note = {
    date: string,
    note: string,
    reportName: string,
    reportType: ReportType
}