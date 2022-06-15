import { Gender, PatientChart } from "nurse-o-core";

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
    }

    return patient;
}
