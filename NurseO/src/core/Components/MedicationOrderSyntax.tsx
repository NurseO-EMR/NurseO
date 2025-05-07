import React from 'react';
import { type MedicationOrder, Frequency, Routine } from "../Types/PatientProfile";

type Props = {
    order: MedicationOrder,
}
export function MedicationOrderSyntax(props: Props) {

    const indexableFrequency: { [key: string]: string } = Frequency
    const frequency = indexableFrequency[props.order.frequency] ?? props.order.frequency

    const indexableRoutine: { [key: string]: string } = Routine
    const routine = indexableRoutine[props.order.routine] ?? props.order.routine
    return (
        <>
            {props.order.genericName && props.order.genericName.length > 0 ? props.order.genericName + " " : ""}
            {props.order.genericName && props.order.genericName.length > 0 && props.order.brandName && props.order.brandName.length > 0 ? "(" : null}
            {props.order.brandName && props.order.brandName.length > 0 ? props.order.brandName.trim() : ""}
            {props.order.genericName && props.order.genericName.length > 0 && props.order.brandName && props.order.brandName.length > 0 ? ")" : null}
            {" "}
            {props.order.concentration}{" "}
            {props.order.route}{" "}
            {frequency} {" "}
            {routine}  {" "}
            {props.order.PRNNote}{" "}
            {props.order.notes ? `${props.order.notes}` : null}{" "}
            {props.order.icd10 ? `for ${props.order.icd10.description}` : null}
        </>

    );
}	