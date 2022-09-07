import { BehaviorSubject } from "rxjs";
import { Error, NoErrors, Settings, PatientChart } from "nurse-o-core";
import { createBrowserHistory, History } from 'history';

export const $patient = new BehaviorSubject<PatientChart>(new PatientChart());
export const $error = new BehaviorSubject<Error>(new NoErrors());
export const $history = new BehaviorSubject<History>(createBrowserHistory());
export const $settings = new BehaviorSubject<Settings>({
    reportSet: [],
    previewColor: "gray-900",
    locations: []
});

async function initState() {
    $error.subscribe(console.log)
}

initState();

