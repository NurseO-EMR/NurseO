import { VitalsOptions } from "../Types/Vitals"
import Database from "./Database"
import { $patient, $vitalsSet, $settings } from "./State"

export function simulatedData() {

    const db = Database.getInstance();
    db.getPatient(5456464);

    // $patient.next({
    //     id: 5456464,
    //     name: "James Smith",
    //     age: 18,
    //     dob: "10/20/1963",
    //     allergies: [
    //         {
    //             name: "penicillin",
    //             reaction: "severe"
    //         },
    //         {
    //             name: "aspirin",
    //             reaction: "severe"
    //         }
    //     ],
    //     gender: "male",
    //     flags: [
    //         {
    //             name: "NPO",
    //             reason: "Safety"
    //         }
    //     ],
    //     immunizations: [],
    //     medicalIssues: [],
    //     height: 185,
    //     weight: 90,
    //     medications: [
    //         {
    //             name: "Acetaminophen",
    //             concentration: "15mg/kg",
    //             route: "PO/PR",
    //             frequency: "every 4 hr",
    //             routine: "PRN",
    //             PRNNote: "for temp >38.3 or discomfort",
    //             notes: "do not exceed 5 doses in 24 hours",
    //             mar: [{
    //                 hour:12,
    //                 minutes:2
    //             }] 
    //         },
    //         {
    //             name: "Amitriptyline",
    //             concentration: "15mg/kg",
    //             route: "PO/PR",
    //             frequency: "every 4 hr",
    //             routine: "PRN",
    //             PRNNote: "for temp >38.3 or discomfort",
    //             notes: "do not exceed 5 doses in 24 hours",
    //             mar: [{
    //                 hour:12,
    //                 minutes:2
    //             }] 
    //         },
    //         {
    //             name: "Buprenorphine",
    //             concentration: "15mg/kg",
    //             route: "PO/PR",
    //             frequency: "every 4 hr",
    //             routine: "PRN",
    //             PRNNote: "for temp >38.3 or discomfort",
    //             notes: "do not exceed 5 doses in 24 hours",
    //             mar: [{
    //                 hour:12,
    //                 minutes:2
    //             }] 
    //         },
    //         {
    //             name: "Ibuprofen",
    //             concentration: "15mg/kg",
    //             route: "PO/PR",
    //             frequency: "every 4 hr",
    //             routine: "PRN",
    //             PRNNote: "for temp >38.3 or discomfort",
    //             notes: "do not exceed 5 doses in 24 hours",
    //             mar: [{
    //                 hour:12,
    //                 minutes:2
    //             }] 
    //         },
    //     ],
    
    //     notes: [
    //         {
    //             date: new Date().toDateString(),
    //             appearance: "normal",
    //             visitReason: "headache",
    //             vitalsSummery: "he has 130/90 blood pressure", 
    //             assessment: "put him to reset for now and reassess later"
    //         }
    //     ],
    
    //     vitals: [],
    //     availableVitalSets: [],
    
        
        
    //   })
    
    
    const nursingMeasuresOptions: VitalsOptions = [
        {
            abbreviation: "des",
            name: "decrease noise/stimuli"
        },
        {
            abbreviation: "h",
            name: "heat"
        },
        {
            abbreviation: "m",
            name: "massage"
        },
        {
            abbreviation: "pr",
            name: "prayer"
        },
        {
            abbreviation: "r",
            name: "reposition"
        },
        {
            abbreviation: "v",
            name: "visitor"
        },
        {
            abbreviation: "c",
            name: "call MD"
        },
        {
            abbreviation: "g",
            name: "generalized"
        },
        {
            abbreviation: "d",
            name: "diversion"
        },
        {
            abbreviation: "i",
            name: "ice"
        },
        {
            abbreviation: "mt",
            name: "music therapy"
        },
        {
            abbreviation: "re",
            name: "relax/rest"
        },
        {
            abbreviation: "to",
            name: "touch"
        },
        {
            abbreviation: "NN",
            name: "see nursing notes"
        },
    ]
    
    
    $vitalsSet.next([
        {
            name: "0-10 Faces/Scales", 
            vitals: [
                {
                    name: "Pain",
                    fieldType: "T/F",
                },
                {
                    name: "Description",
                    fieldType: "text",
                },
                {
                    name: "Location",
                    fieldType: "text",
                }, 
                {
                    name: "duration",
                    fieldType: "number"
                },
                {
                    name: "Intensity/Score",
                    fieldType: "number"
                },
                {
                    name: "Medicated",
                    fieldType: "text",
                },
                {
                    name: "Nursing Measures",
                    fieldType: "options",
                    VitalsOptions: nursingMeasuresOptions
                }
            ]
        },
    ])
    
    $settings.next({
        numberOfTimeSlots: 5
    })
    
}
