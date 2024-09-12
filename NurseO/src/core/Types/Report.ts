export type ReportSet = {
    name: string,
    reportFields: ReportField[],
    image?: string,
    imageAlt?: string
    type: ReportType
};

export type ReportField = {
    name: string,
    fieldType: ReportInputType,   
    options?: string[]
    labels?: string[],
    addSecondField?: boolean
}

export type ReportInputType = "number" | "text" | "T/F" | "checkbox" | "options" | "NA"

export type StudentReport = {
    setName: string,
    fieldName: string,
    time:string,
    value:string,
    date: string,
    reportType: ReportType,
}
    
export enum ReportType {
    "studentVitalsReport" = "studentVitalsReport", 
    "studentLabReport" = "studentLabReport", 
    "studentAssessmentReport" = "studentAssessmentReport", 
    "studentIOReport" = "studentIOReport" 
};