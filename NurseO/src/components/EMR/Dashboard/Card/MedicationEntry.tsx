import React, { useContext } from 'react';
import type { MedicationOrder } from '~/core/index';
import { api } from '~/utils/api';
import { GlobalContext } from '~/services/State';


type Props = {
    order: MedicationOrder
}


export default function MedicationEntry(props: Props) {
    const { locationId } = useContext(GlobalContext)
    const medication = api.medication.student_getMedicationById.useQuery({ medId: props.order.id, locationId })




    return (
        <tr>
            <td className="border-2 p-2 border-trueGray-200">{medication.data?.genericName}</td>
            <td className="border-2 p-2 border-trueGray-200">{medication.data?.brandName}</td>
            <td className="border-2 p-2 border-trueGray-200">{props.order.concentration}</td>
            <td className="border-2 p-2 border-trueGray-200">{props.order.route}</td>
            <td className="border-2 p-2 border-trueGray-200">{props.order.frequency}</td>
            <td className="border-2 p-2 border-trueGray-200">{props.order.routine} {props.order.PRNNote}</td>
            <td className="border-2 p-2 border-trueGray-200">{props.order.notes}</td>
        </tr>
    );
}
