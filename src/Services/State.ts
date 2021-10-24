import { NoErrors } from './../Types/ErrorCodes';
import { BehaviorSubject } from "rxjs";
import { PatientChart } from "../Types/PatientProfile";
import { Settings } from "../Types/Settings";
import { ReportSet } from "../Types/Report";
import {simulatedData} from "./TestData";
import { Error } from "../Types/ErrorCodes";

export const $patient = new BehaviorSubject<PatientChart>(null);
export const $reportSet = new BehaviorSubject<ReportSet[]>([]);
export const $settings = new BehaviorSubject<Settings>(null);
export const $error = new BehaviorSubject<Error>(new NoErrors());

simulatedData();

$error.subscribe(console.log)