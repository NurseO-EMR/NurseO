import React from 'react';
import { type MedicationOrder, Frequency, Routine } from "../Types/PatientProfile";

type Props = {
    order: MedicationOrder,
}
export function MedicationOrderSyntax(props: Props) {
    return <>{makeMedOrderString(props.order)}</>
}

export function makeMedOrderString(order: MedicationOrder): string {
    const indexableFrequency: { [key: string]: string } = Frequency
    const frequency = indexableFrequency[order.frequency] ?? order.frequency

    const indexableRoutine: { [key: string]: string } = Routine
    const routine = indexableRoutine[order.routine] ?? order.routine

    const stringOrder = `${order.genericName && order.genericName.length > 0 ? order.genericName + " " : ""}
    ${order.genericName && order.genericName.length > 0 && order.brandName && order.brandName.length > 0 ? "(" : ""}
    ${order.brandName && order.brandName.length > 0 ? order.brandName.trim() : ""}
    ${order.genericName && order.genericName.length > 0 && order.brandName && order.brandName.length > 0 ? ")" : ""}
    ${order.concentration} 
    ${order.route} 
    ${frequency} 
    ${routine} 
    ${order.PRNNote ?? ""} 
    ${order.notes ? `${order.notes}` : ""} 
    ${order.icd10?.description ?? ""}
    `

    return stringOrder.replaceAll("\n", "").split(" ").filter(s => s.length > 0).join(" ")
}