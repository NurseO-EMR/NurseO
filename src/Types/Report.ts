export type ReportSet = {
    name: string,
    reportFields: Report[],
    type: ReportType
};

export type Report = {
    name: string,
    fieldType: ReportInputType,   
    VitalsOptions?: ReportOptions
    value?: string, //prop can be removed!
}

export type ReportInputType = "number" | "text" | "T/F" | "checkbox" | "options"

export type ReportOptions = Array<ReportOption>

export class ReportOption{
    name?: string = "";
    abbreviation: string = ""
}

export type StudentReport = {
    setName: string,
    vitalName: string,
    time:string,
    value:string,
    date: string,
    reportType: ReportType,
}
    
export type ReportType = "studentVitalsReport" | "studentLabReport" | "studentAssessmentReport";

