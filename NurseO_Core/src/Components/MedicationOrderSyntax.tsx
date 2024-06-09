import React from 'react';
import { Medication } from "../Types/Medications";
import { MedicationOrder, Frequency, Routine } from "../Types/PatientProfile";

type Props = {
    order: MedicationOrder,
    med: Medication

}
export function MedicationOrderSyntax(props: Props) {

    const indexableFrequency:{[key: string]:string} = Frequency
    const frequency = indexableFrequency[props.order.frequency] || props.order.frequency

    const indexableRoutine:{[key: string]:string} = Routine
    const routine = indexableRoutine[props.order.routine] || props.order.routine
    return (
        <>
            {props.med.genericName && props.med.genericName.length > 0 ? props.med.genericName + " ": ""}
            {props.med.genericName && props.med.genericName.length > 0 && props.med.brandName && props.med.brandName.length > 0 ? "(" : null}
            {props.med.brandName && props.med.brandName.length > 0 ? props.med.brandName: ""}
            {props.med.genericName && props.med.genericName.length > 0 && props.med.brandName && props.med.brandName.length > 0  ? ")" : null}
            {" "}
            {props.order.concentration}{" "}
            {props.order.route}{" "}
            {frequency} {" "}
            {routine}  {" "}
            {props.order.PRNNote}{" "}
            {props.order.notes ? `${props.order.notes}` : null}
        </>

    );
}	