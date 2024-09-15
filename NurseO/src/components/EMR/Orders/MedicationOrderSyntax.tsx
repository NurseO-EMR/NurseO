import React, { useContext } from 'react';
import { MedicationOrderSyntax as BaseMedicationOrderSyntax, type MedicationOrder } from "~/core/index";
import { api } from '~/utils/api';
import { GlobalContext } from '~/services/State';
type Props = {
    order: MedicationOrder,

}

export default function MedicationOrderSyntax(props: Props) {
    const { locationId } = useContext(GlobalContext)
    const medication = api.medication.student_getMedicationById.useQuery({ medId: props.order.id, locationId })

    console.log(medication.data)
    if (!medication.isLoading && medication.data) {
        const temp = { ...props.order }
        temp.brandName = medication.data.brandName
        temp.genericName = medication.data.genericName
        return (
            <BaseMedicationOrderSyntax order={temp} />
        );
    } else {
        return "loading..."
    }
}	
