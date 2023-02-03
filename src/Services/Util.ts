import { Gender, PatientChart, Time } from "nurse-o-core";
import { Database } from "./Database";

export function createEmptyPatient():PatientChart {
    const patient:PatientChart = {
        id: "",
        name: "",
        age: "",
        dob: "",
        gender: Gender.Other,
        height: "",
        labDocURL: "",
        studentUID: "",
        weight: "",
        flags: [],
        allergies: [],
        medicalHistory: [],
        socialHistory: [],
        notes: [],
        time: {hour: 0,minutes: 0},
        studentReports: [],
        medicationOrders: [],
        immunizations: [],
        customOrders: [],
        courseId: ""
    }

    return patient;
}


export function makeTimeObject(timeString: string) {
    const splited = timeString.split(":");
    const output: Time = {
        hour: Number.parseInt(splited[0]),
        minutes: Number.parseInt(splited[1]),
    }
    return output
}


export function convertTimeToString(time:Time):string {
    return `${time.hour.toString().padStart(2,"0")}:${time.minutes.toString().padStart(2,"0")}`
}


export async function getCourses() {
    const db = Database.getInstance()
    const settings = await db.getSettings();
    let courses = settings.courses;
    courses = courses.sort((a,b)=>a.name.localeCompare(b.name))
    return courses;
}