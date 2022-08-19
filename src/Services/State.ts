import { PatientChart } from "nurse-o-core";
import { BehaviorSubject } from "rxjs";

export const $patient = new BehaviorSubject<PatientChart>(new PatientChart());
export const $providerOrdersAvailable = new BehaviorSubject<boolean>(false);
export const $locationID = new BehaviorSubject<string | null>(null);
export const $showVerify = new BehaviorSubject<boolean>(true);