import { ReportSet } from "./Report";

export type Settings = {
    numberOfTimeSlots: number,
    reportSet: ReportSet[],
    previewColor: string,
} | null