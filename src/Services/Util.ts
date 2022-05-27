import { PatientChart } from "nurse-o-core";

export function createEmptyPatient():PatientChart {
    const patient:PatientChart = {
        id: "",
        name: "",
        age: "",
        dob: "",
        gender: "other",
        height: "",
        labDocURL: "",
        studentUID: "",
        weight: "",
        flags: [],
        allergies: [],
        medicalIssues: [],
        notes: [],
        time: {hour: 0,minutes: 0},
        studentReports: [],
        medicationOrders: [],
        immunizations: [],
        customOrders: [],
    }

    return patient;
}