import React from 'react';
import { MedicationOrder } from '../Types/PatientProfile.js';

type Props = {
    order: MedicationOrder,
    medName: string

}
export function MedicationOrderSyntax(props: Props) {
    return (
        <>
            {props.medName} {" "}
            {props.order.concentration}{" "}
            {props.order.route}{" "}
            {props.order.frequency} {" "}
            {props.order.routine}  {" "}
            {props.order.PRNNote}{" "}
            {props.order.notes ? `(${props.order.notes})` : null}
        </>

    );
}	
