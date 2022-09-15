import { Gender } from "./Gender.js"
import { ReportType, StudentReport } from "./Report.js";


export class Time {
    hour:number = 0;
    minutes:number = 0;
}
export class PatientChart {
    id: string = "";
    name: string = "";
    dob: string = "";
    age: string = "";
    gender: Gender = Gender.Other
    height: string = "";
    weight: string = "";
    time: Time = new Time();
    allergies: Allergy[] = [];
    medicalHistory: MedicalHistory[] = [];
    socialHistory: string[] = [];
    medicationOrders: MedicationOrder[] = [];
    customOrders: CustomOrder[] = [];
    flags: Flag[] = [];
    immunizations: string[] = [];
    studentReports: StudentReport[] = [];
    notes: Note[] = [];
    studentUID: string = "";
    labDocURL: string = "";
};

export type Order = {
    orderKind: OrderKind,
    orderType: OrderType
}

export type CustomOrder = Order & {
    order: string,    
}


export type MedicationOrder  = Order & {
    id: string;
    concentration:string;
    route: string;
    frequency: Frequency;
    routine: Routine;
    PRNNote: string | null;
    notes: string;
    mar: Time[];
}


export type MedicalHistory = {
    date: string
    title: string
    notes:string
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
    NA = "",
}


export enum OrderType {
    NA = "",
    admission = "Admission",
    standing = "Standing",
}

export enum Routine {
    NA = "",
    PRN = "PRN",
    NOW = "NOW",
    Scheduled = "Scheduled",
}

export enum Frequency {
    NA = "",
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
    qd = "qd",
    bid="bid",
    qam="qam",
    
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