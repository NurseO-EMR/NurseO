import { Gender, type PatientChart, type Time } from "@nurse-o-core/index";

export function createEmptyPatient():PatientChart {
    const patient:PatientChart = {
        id: "",
        dbId: -1,
        name: "",
        age: "",
        dob: "",
        gender: Gender.Other,
        height: "",
        labDocURL: "",
        weight: "",
        flags: [],
        allergies: [],
        medicalHistory: [],
        socialHistory: [],
        notes: [],
        time: {hour: 0,minute: 0},
        studentReports: [],
        medicationOrders: [],
        immunizations: [],
        customOrders: [],
        courseId: -1
    }

    return patient;
}


export function makeTimeObject(timeString: string) {
    const splited = timeString.split(":");
    if(!(splited[0] && splited[1])) throw new Error("wrong time string");
    const output: Time = {
        hour: Number.parseInt(splited[0]),
        minute: Number.parseInt(splited[1]),
    }
    return output
}


export function convertTimeToString(time:Time):string {
    return `${time.hour.toString().padStart(2,"0")}:${time.minute.toString().padStart(2,"0")}`
}