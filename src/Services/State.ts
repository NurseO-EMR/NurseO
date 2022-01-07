import { NoErrors } from './../Types/ErrorCodes';
import { BehaviorSubject } from "rxjs";
import { PatientChart } from "../Types/PatientProfile";
import { Settings } from "../Types/Settings";
import { Error } from "../Types/ErrorCodes";
import { createBrowserHistory, History } from 'history';

export const $patient = new BehaviorSubject<PatientChart>(new PatientChart());
export const $error = new BehaviorSubject<Error>(new NoErrors());
export const $history = new BehaviorSubject<History>(createBrowserHistory());
export const $providerOrdersAvailable = new BehaviorSubject<boolean>(false);
export const $settings = new BehaviorSubject<Settings>({
    numberOfTimeSlots: 5,
    reportSet: [],
    previewColor: "gray-900"
});

async function initState() {
    $error.subscribe(console.log)
}

initState();

