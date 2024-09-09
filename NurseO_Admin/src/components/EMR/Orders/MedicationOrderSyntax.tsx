import React, { useContext } from 'react';
import { MedicationOrderSyntax as BaseMedicationOrderSyntax, type MedicationOrder } from "@nurse-o-core/index";
import { api } from '~/utils/api';
import { GlobalContext } from '~/services/State';
type Props = {
    order: MedicationOrder,

}

export default function MedicationOrderSyntax(props: Props) {
    const { locationId } = useContext(GlobalContext)
    const medication = api.medication.student_getMedicationById.useQuery({ medId: props.order.id, locationId })


    if (!medication.isLoading && medication.data) {
        return (
            <BaseMedicationOrderSyntax order={props.order} />
        );
    } else {
        return "loading..."
    }
}	
