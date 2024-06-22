import { type Time, type MedicationOrder } from '@nurse-o-core/index';
import { createContext } from "react";

export const GlobalContext = createContext({
    locationId: -1,
    patientMedOrders: [] as MedicationOrder[],
    time: {hour: 0, minute: 0} as Time,
    setPatientMedOrders: (_: MedicationOrder[])=>{console.log},
    setLocationId: (_: number)=>{console.log},
    setTime: (_: Time)=>{console.log}
});
