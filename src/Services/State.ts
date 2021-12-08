import { NoErrors } from './../Types/ErrorCodes';
import { BehaviorSubject } from "rxjs";
import { PatientChart } from "../Types/PatientProfile";
import { Settings } from "../Types/Settings";
import { Error } from "../Types/ErrorCodes";
import { createBrowserHistory, History } from 'history';
import Database from './Database';
// import {ReportSet, Report} from "./../Types/Report"

export const $patient = new BehaviorSubject<PatientChart>(null);
export const $error = new BehaviorSubject<Error>(new NoErrors());
export const $history = new BehaviorSubject<History>(createBrowserHistory());
export const $providerOrdersAvailable = new BehaviorSubject<boolean>(false);
export const $settings = new BehaviorSubject<Settings>({
    numberOfTimeSlots: 5,
    reportSet: [],
    previewColor: "gray-900"
});

async function initState() {
    const db = Database.getInstance();
    await db.getSettings();
    $error.subscribe(console.log)
    // await doThings();
}

initState();


// async function doThings() {
//     const db = Database.getInstance();
//     const settings = $settings.value;
//     let reportSets = settings!.reportSet;
//     const report: Report = {
//         name: "Intervention",
//         fieldType: "options",
//         VitalsOptions: [
//             {abbreviation: "des", name: "decrease noise/stimuli"},
//             {abbreviation: "h", name: "heat"},
//             {abbreviation: "m", name: "massage"},
//             {abbreviation: "pr", name: "prayer"},
//             {abbreviation: "r", name: "reposition"},
//             {abbreviation: "v", name: "visitor"},
//             {abbreviation: "c", name: "call MD"},
//             {abbreviation: "g", name: "generalized"},
//             {abbreviation: "d", name: "diversion"},
//             {abbreviation: "i", name: "ice"},
//             {abbreviation: "mt", name: "music therapy"},
//             {abbreviation: "re", name: "relax/rest"},
//             {abbreviation: "to", name: "touch"},
//             {abbreviation: "NN", name: "see nursing notes"},
//         ]
        
//     }

//     reportSets[1].reportFields.push(report);

//     settings!.reportSet = reportSets;
//     $settings.next(settings);
    
//     await db.updateSettings()

// //     // console.log($settings.value)
// }