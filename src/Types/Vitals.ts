export type VitalsSet = {
    name: string,
    vitals: Vital[],
};

export type Vital = {
    name: string,
    fieldType: "number" | "text" | "T/F" | "options",   
    VitalsOptions?: VitalsOptions
    time?: Date,
    value?: string,
}

export type VitalsOptions = Array<VitalsOption>

type VitalsOption = {
    name: string,
    abbreviation: string,
}
    


