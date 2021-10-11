import { BehaviorSubject } from "rxjs";
import { PatientChart } from "../Types/PatientProfile";
import { Settings } from "../Types/Settings";
import { Status } from "../Types/Status";
import { VitalsSet } from "../Types/Vitals";
import {simulatedData} from "./TestData";

export const $patient = new BehaviorSubject<PatientChart>(null);
export const $vitalsSet = new BehaviorSubject<VitalsSet[]>([]);
export const $settings = new BehaviorSubject<Settings>(null);
export const $error = new BehaviorSubject<string | null>(null);

simulatedData();

$error.subscribe(console.log)