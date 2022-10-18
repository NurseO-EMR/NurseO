import React from 'react';
import { Medication } from '../Types/Medications.js';
import { MedicationOrder } from '../Types/PatientProfile.js';

type Props = {
    order: MedicationOrder,
    med: Medication

}
export function MedicationOrderSyntax(props: Props) {
    return (
        <>
            {props.med.genericName ? props.med.genericName + " ": ""}
            {props.med.brandName ? "( "+ props.med.brandName+ " ) ": ""}
            {props.order.concentration}{" "}
            {props.order.route}{" "}
            {props.order.frequency} {" "}
            {props.order.routine}  {" "}
            {props.order.PRNNote}{" "}
            {props.order.notes ? `(${props.order.notes})` : null}
        </>

    );
}	
