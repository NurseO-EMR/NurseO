export type ReportSet = {
    name: string,
    vitals: Report[],
    type: ReportType
};

export type Report = {
    name: string,
    fieldType: "number" | "text" | "T/F" | "options",   
    VitalsOptions?: ReportOptions
    value?: string,
}

export type ReportOptions = Array<ReportOption>

type ReportOption = {
    name: string,
    abbreviation: string,
}

export type StudentReport = {
    setName: string,
    vitalName: string,
    time:string,
    value:string,
    date: string,
    reportType: ReportType
}
    
export type ReportType = "studentVitalsReport" | "studentLabReport";

