export type ReportSet = {
    name: string,
    reportFields: Report[],
    image?: string,
    type: ReportType
};

export type Report = {
    name: string,
    fieldType: ReportInputType,   
    VitalsOptions?: ReportOptions
    labels?: string[]
}

export type ReportInputType = "number" | "text" | "T/F" | "checkbox" | "options" | "NA"

export type ReportOptions = Array<ReportOption>

export class ReportOption{
    name: string = "";
}

export type StudentReport = {
    setName: string,
    vitalName: string,
    time:string,
    value:string,
    date: string,
    reportType: ReportType,
}
    
export type ReportType = "studentVitalsReport" | "studentLabReport" | "studentAssessmentReport" | "studentIOReport";