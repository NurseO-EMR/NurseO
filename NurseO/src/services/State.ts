import { createContext } from "react";
import { type MedicationOrder, PatientChart, type Time } from "~/core/index";

export const GlobalContext = createContext({
    studentId: "",
    patient: new PatientChart(),
    locationId: -1,
    patientMedOrders: [] as MedicationOrder[],
    time: { hour: 0, minute: 0 } as Time,
    themeName: "standard",
    setStudentId: (_: string)=>{console.log},
    setPatient: (_: PatientChart)=>{console.log},
    setLocationId: (_: number)=>{console.log},
    setPatientMedOrders: (_: MedicationOrder[]) => { console.log },
    setTime: (_: Time) => { console.log },
    setThemeName: (_: string) => { console.log }
});
