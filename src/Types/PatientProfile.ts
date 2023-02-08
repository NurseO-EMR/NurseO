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
    diagnosis?: string = "";
    courseId?: string = "";
};

export type Order = {
    orderKind: OrderKind,
    orderType: OrderType,
    time?: string
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
    mar: MarRecord[];
    completed?: boolean
    holdReason?: string
}

export type MarRecord = Time & {
    dose?: string
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
    provider = "Provider",
    protocol = "Protocol/Pathway",
}

export enum Routine {
    NA = "",
    PRN = "as needed (PRN)",
    NOW = "NOW",
    Scheduled = "Scheduled",
}

export enum Frequency {
    NA = "",
    q15m = "every 15 minutes",
    q30m = "every 30 minutes",
    q1hr = "every hour",
    q2hr = "every two hours",
    q4hr = "every four hours",
    q5hr = "every five hours",
    q6hr = "every six hours",
    q8hr = "every eight hours",
    q12hr = "every twelve hours",
    qhs = "daily at bedtime",
    qd = " daily",
    bid="two times daily",
    qam="in the morning",
    qpm="in the evening",
    qac="before meals",
    qpc="after meals",
    tid="three times daily",
    qid="four times daily",
    once = "once",
    continuous  = "continuous"
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