export type VitalsSet = {
    name: string,
    vitals: Vital[],
};

export type Vital = {
    name: string,
    fieldType: "number" | "text" | "T/F" | "options",   
    VitalsOptions?: VitalsOptions
    value?: string,
}

export type VitalsOptions = Array<VitalsOption>

type VitalsOption = {
    name: string,
    abbreviation: string,
}

export type StudentVitalsReport = {
    setName: string,
    vitalName: string,
    time:string,
    value:string,
}
    


