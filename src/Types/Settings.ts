import { LocationDefinition } from "./Medications";
import { ReportSet } from "./Report";

export type Settings = {
    reportSet: ReportSet[],
    previewColor: string,
    locations: LocationDefinition[]
    courses: Course[]
}

export type Course = {
    id: string,
    name: string
}