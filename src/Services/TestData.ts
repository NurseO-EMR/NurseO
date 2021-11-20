import { OrderType, PatientChart } from './../Types/PatientProfile';
import { ReportOptions } from "../Types/Report"
import { $patient, $reportSet, $settings } from "./State"

export function simulatedData() {
    let patientChart:PatientChart = {
        "medicationOrders": [{
            "routine": "PRN",
            "mar": [{
                "hour": 12,
                "minutes": 2
            }, {
                "minutes": 0,
                "hour": 8
            }],
            "orderType": OrderType.admission,
            "id": "0",
            "frequency": "every 4 hr",
            "PRNNote": "for temp >38.3 or discomfort",
            "notes": "do not exceed 5 doses in 24 hours",
            "concentration": "15mg/kg",
            "route": "PO/PR",
            doctorName: "Miami Doc"
        }, {
            "orderType": OrderType.admission,
            "notes": "do not exceed 5 doses in 24 hours",
            "route": "PO/PR",
            "concentration": "15mg/kg",
            "mar": [{
                "minutes": 2,
                "hour": 14
            }, {
                "hour": 8,
                "minutes": 0
            }],
            "PRNNote": "for temp >38.3 or discomfort",
            "id": "1",
            "routine": "PRN",
            "frequency": "every 4 hr",
            doctorName: "Miami Doc"
        }, {
            "orderType": OrderType.standing,
            "PRNNote": "for temp >38.3 or discomfort",
            "route": "PO/PR",
            "frequency": "every 4 hr",
            "id": "2",
            "notes": "do not exceed 5 doses in 24 hours",
            "routine": "PRN",
            "mar": [{
                "minutes": 2,
                "hour": 13
            }, {
                "hour": 8,
                "minutes": 0
            }],
            "concentration": "15mg/kg",
            doctorName: "Miami Doc"
        }, {
            "orderType":  OrderType.provider,
            "mar": [{
                "minutes": 56,
                "hour": 22
            }],
            "notes": "do not exceed 5 doses in 24 hours",
            "PRNNote": "for temp >38.3 or discomfort",
            "concentration": "15mg/kg",
            "routine": "PRN",
            "route": "PO/PR",
            "frequency": "every 4 hr",
            "id": "3",
            doctorName: "Miami Doc"
        }],
        "dob": "10/20/1963",
        "allergies": [{
            "reaction": "severe",
            "name": "penicillin"
        }, {
            "name": "eggs",
            "reaction": "severe"
        }],
        "notes": [{
            "note": "Lung sounds clear to auscultation bilaterally. Color pink. No signs of respiratory distress noted. VSS. Patient eating 90% of his meals and tolerating well. No abdominal distention or emesis this shift. Patient ambulating adequately. Voiding spontaneously. No BM this shift. Patient’s weight remained the same. Spouse visited patient today. Bed rails up x4. No hazards in room. Call light within reach\\n\\n-- note from https://www.berxi.com/resources/articles/nurses-notes/",
            "date": "2021-11-10",
            "title": "Normal Patient"
        }, {
            "title": "Code Blue",
            "note": "When I walked in the room, the patient was blue and having trouble breathing. I called a Code Blue and started CPR. Then Code team arrived\\n\\n-- https://www.berxi.com/resources/articles/nurses-notes/",
            "date": "2021-11-20"
        }],
        "id": "5456464",
        "gender": "male",
        "medicalIssues": [],
        "name": "James Smith",
        "studentReports": [{
            "date": "2021-10-19",
            "value": "Y",
            "time": "13:13",
            "vitalName": "Pain",
            "setName": "0-10 Faces/Scales",
            "reportType": "studentVitalsReport"
        }, {
            "time": "13:13",
            "value": "sharp",
            "date": "2021-10-19",
            "setName": "0-10 Faces/Scales",
            "vitalName": "Description",
            "reportType": "studentVitalsReport"
        }, {
            "value": "knee pain",
            "reportType": "studentVitalsReport",
            "setName": "0-10 Faces/Scales",
            "date": "2021-10-19",
            "vitalName": "Location",
            "time": "13:13"
        }, {
            "date": "2021-10-19",
            "setName": "0-10 Faces/Scales",
            "value": "3",
            "vitalName": "duration",
            "reportType": "studentVitalsReport",
            "time": "13:13"
        }, {
            "setName": "0-10 Faces/Scales",
            "date": "2021-10-19",
            "vitalName": "Intensity/Score",
            "reportType": "studentVitalsReport",
            "time": "13:13",
            "value": "2"
        }, {
            "value": "no",
            "reportType": "studentVitalsReport",
            "date": "2021-10-19",
            "time": "13:13",
            "vitalName": "Medicated",
            "setName": "0-10 Faces/Scales"
        }, {
            "reportType": "studentVitalsReport",
            "value": "h",
            "date": "2021-10-19",
            "setName": "0-10 Faces/Scales",
            "vitalName": "Nursing Measures",
            "time": "13:13"
        }, {
            "date": "2021-10-21",
            "vitalName": "Pain",
            "reportType": "studentVitalsReport",
            "setName": "0-10 Faces/Scales",
            "time": "23:55",
            "value": "Y"
        }, {
            "setName": "0-10 Faces/Scales",
            "date": "2021-10-21",
            "value": "rtygerg",
            "time": "23:55",
            "vitalName": "Description",
            "reportType": "studentVitalsReport"
        }, {
            "date": "2021-10-21",
            "vitalName": "Location",
            "time": "23:55",
            "reportType": "studentVitalsReport",
            "setName": "0-10 Faces/Scales",
            "value": "ewrsfgwefwe"
        }, {
            "reportType": "studentVitalsReport",
            "value": "Y",
            "date": "2021-10-25",
            "time": "22:50",
            "vitalName": "Pain",
            "setName": "0-10 Faces/Scales"
        }, {
            "vitalName": "Description",
            "time": "22:50",
            "setName": "0-10 Faces/Scales",
            "reportType": "studentVitalsReport",
            "date": "2021-10-25",
            "value": ""
        }, {
            "time": "22:50",
            "setName": "0-10 Faces/Scales",
            "value": "Upper right ",
            "vitalName": "Location",
            "date": "2021-10-25",
            "reportType": "studentVitalsReport"
        }, {
            "value": "4",
            "setName": "0-10 Faces/Scales",
            "reportType": "studentVitalsReport",
            "time": "22:50",
            "vitalName": "duration",
            "date": "2021-10-25"
        }, {
            "reportType": "studentVitalsReport",
            "value": "i",
            "vitalName": "Nursing Measures",
            "date": "2021-10-25",
            "setName": "0-10 Faces/Scales",
            "time": "22:50"
        }, {
            "vitalName": "Nursing Measures",
            "time": "22:47",
            "value": "pr",
            "date": "2021-10-25",
            "reportType": "studentVitalsReport",
            "setName": "0-10 Faces/Scales"
        }, {
            "reportType": "studentVitalsReport",
            "time": "01:12",
            "value": "Y",
            "setName": "0-10 Faces/Scales",
            "date": "2021-10-26",
            "vitalName": "Pain"
        }, {
            "reportType": "studentVitalsReport",
            "value": "3",
            "time": "01:12",
            "vitalName": "duration",
            "setName": "0-10 Faces/Scales",
            "date": "2021-10-26"
        }, {
            "reportType": "studentVitalsReport",
            "value": "re",
            "vitalName": "Location",
            "date": "2021-10-26",
            "setName": "0-10 Faces/Scales",
            "time": "01:12"
        }, {
            "value": "2",
            "time": "01:12",
            "vitalName": "Intensity/Score",
            "reportType": "studentVitalsReport",
            "setName": "0-10 Faces/Scales",
            "date": "2021-10-26"
        }, {
            "date": "2021-10-26",
            "vitalName": "duration",
            "value": "6",
            "time": "02:10",
            "setName": "0-10 Faces/Scales",
            "reportType": "studentVitalsReport"
        }],
        "age": 18,
        "weight": 90,
        "availableReportSets": [],
        "immunizations": [],
        "height": 185,
        "time": "08:00",
        "flags": [{
            "reason": "Safety",
            "name": "NPO"
        }]
    }
    $patient.next(patientChart)
    

    const nursingMeasuresOptions: ReportOptions = [
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


    $reportSet.next([
        {
            name: "0-10 Faces/Scales",
            type: "studentVitalsReport",
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
