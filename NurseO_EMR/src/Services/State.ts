// import { BehaviorSubject } from "rxjs";
// import { Error, NoErrors, Settings, PatientChart } from "@nurse-o-core/index";
// import { createBrowserHistory, History } from 'history';

import { createContext } from "react";
import { PatientChart } from "../../../NurseO_Core/src/Types/PatientProfile";

// export const $patient = new BehaviorSubject<PatientChart>(new PatientChart());
// export const $error = new BehaviorSubject<Error>(new NoErrors());
// export const $history = new BehaviorSubject<History>(createBrowserHistory());
// export const $settings = new BehaviorSubject<Settings>({
//     reportSet: [],
//     previewColor: "gray-900",
//     locations: [],
//     courses: []
// });

// export const $locationID = new BehaviorSubject<string | null>(null);


// async function initState() {
//     $error.subscribe(console.log)
// }

// initState();

export const GlobalContext = createContext({
    studentId: "",
    patient: new PatientChart(),
    locationId: -1,
    setStudentId: (_: string)=>{console.log},
    setPatient: (_: PatientChart)=>{console.log},
    setLocationId: (_: number)=>{console.log},
});
