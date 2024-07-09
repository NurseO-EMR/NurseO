import { Gender } from "./Gender"
import { ReportType, StudentReport } from "./Report";


export class Time {
    hour:number = 0;
    minute:number = 0;
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
    studentId?: string | null = "";
    labDocURL?: string | null = "";
    imagingURL?: string | null = "";
    diagnosis?: string | null = "";
    courseId: number = -1;
    dbId: number = -1;
};

export type Order = {
    orderKind: OrderKind,
    orderType: OrderType,
    time?: string | null
}

export type CustomOrder = Order & {
    order: string,    
}


export type MedicationOrder  = Order & {
    id: number; // med id 
    orderId: number;
    concentration:string;
    route: string;
    frequency: Frequency;
    routine: Routine;
    PRNNote: string | null;
    notes: string;
    mar: MarRecord[];
    completed?: boolean
    holdReason?: string | null

    // these are for data fetching to make it cheaper to pull meds from db
    genericName?: string;
    brandName?: string;
    narcoticCountNeeded?: boolean 
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