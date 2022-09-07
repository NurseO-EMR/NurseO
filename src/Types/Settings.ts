import { LocationDefinition } from "./Medications";
import { ReportSet } from "./Report";

export type Settings = {
    reportSet: ReportSet[],
    previewColor: string,
    locations: LocationDefinition[]
}