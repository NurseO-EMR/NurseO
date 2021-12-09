import { Gender } from "./Gender"
import { StudentReport } from "./Report";
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


export enum OrderType {
    admission = "Admission",
    standing = "Standing",
    provider = "Provider",
    NA = "NA"
}

export class MedicationOrder {
    id: string = ""
    concentration:string = ""
    route: string = ""
    frequency: string = ""
    routine: string = ""
    PRNNote: string | null = ""
    notes: string = ""
    mar: Time[] = []
    orderType: OrderType = OrderType.NA;
    doctorName: string = ""
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
    note: string
}