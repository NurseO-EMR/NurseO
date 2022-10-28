import {MedicationOrder, Medication, Frequency} from "nurse-o-core"
 
type Props = {
    order: MedicationOrder,
    med: Medication

}
export function MedicationOrderSyntax(props: Props) {
    // console.log(Object.)
    console.log(props.order.frequency)
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