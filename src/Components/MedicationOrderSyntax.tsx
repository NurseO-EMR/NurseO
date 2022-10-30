import React from 'react';
import { Medication } from "../Types/Medications";
import { MedicationOrder, Frequency } from "../Types/PatientProfile.js";

 
type Props = {
    order: MedicationOrder,
    med: Medication

}
export function MedicationOrderSyntax(props: Props) {

    const indexableFrequency:{[key: string]:string} = Frequency
    const frequency = indexableFrequency[props.order.frequency] || props.order.frequency

    return (
        <>
            {props.med.genericName ? props.med.genericName + " ": ""}
            {props.med.brandName ? "( "+ props.med.brandName+ " ) ": ""}
            {props.order.concentration}{" "}
            {props.order.route}{" "}
            {frequency} {" "}
            {props.order.routine}  {" "}
            {props.order.PRNNote}{" "}
            {props.order.notes ? `(${props.order.notes})` : null}
        </>

    );
}	