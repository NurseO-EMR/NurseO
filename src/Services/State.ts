import { BehaviorSubject } from "rxjs";
import { PatientChart } from "../Types/PatientProfile";

export const $patient = new BehaviorSubject<PatientChart>(null);

$patient.next({
    name: "James Smith",
    age: 18,
    dob: new Date(),
    allergies: [
        {
            name: "penicillin",
            reaction: "severe"
        },
        {
            name: "aspirin",
            reaction: "severe"
        }
    ],
    gender: "male",
    flags: ["NPO"],
    immunizations: [],
    medicalIssues: [],
    height: 185,
    weight: 90,
    medications: [
        {
            name: "Acetaminophen",
            concentration: "15mg/kg",
            route: "PO/PR",
            frequency: "every 4 hr",
            routine: "PRN",
            PRNNote: "for temp >38.3 or discomfort",
            notes: "do not exceed 5 doses in 24 hours",
            mar: [[12,2]] 
        },
        {
            name: "Amitriptyline",
            concentration: "15mg/kg",
            route: "PO/PR",
            frequency: "every 4 hr",
            routine: "PRN",
            PRNNote: "for temp >38.3 or discomfort",
            notes: "do not exceed 5 doses in 24 hours",
            mar: [[12,2]] 
        },
        {
            name: "Buprenorphine",
            concentration: "15mg/kg",
            route: "PO/PR",
            frequency: "every 4 hr",
            routine: "PRN",
            PRNNote: "for temp >38.3 or discomfort",
            notes: "do not exceed 5 doses in 24 hours",
            mar: [[12,2]] 
        },
        {
            name: "Ibuprofen",
            concentration: "15mg/kg",
            route: "PO/PR",
            frequency: "every 4 hr",
            routine: "PRN",
            PRNNote: "for temp >38.3 or discomfort",
            notes: "do not exceed 5 doses in 24 hours",
            mar: [[12,2]] 
        },
    ],

    notes: [
        {
            date: new Date(),
            appearance: "normal",
            visitReason: "headache",
            vitalsSummery: "he has 130/90 blood pressure", 
            assessment: "put him to reset for now and reassess later"
        }
    ]
  })

