import { createContext } from "react";
import { PatientChart } from "@nurse-o-core/index";

export const GlobalContext = createContext({
    studentId: "",
    patient: new PatientChart(),
    locationId: -1,
    setStudentId: (_: string)=>{console.log},
    setPatient: (_: PatientChart)=>{console.log},
    setLocationId: (_: number)=>{console.log},
});
