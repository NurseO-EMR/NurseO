import React, { useContext } from 'react';
import Orders from '~/components/EMR/Orders/Orders';
import { OrderType } from "~/core/index";
import StudentViewPage from '../_StudentViewPage';
import { GlobalContext } from '~/services/State';

export default function AdmissionOrdersPage() {
    const { patient } = useContext(GlobalContext)

    return (
        <StudentViewPage>
            <Orders orderType={OrderType.admission} orders={[...patient.customOrders, ...patient.medicationOrders]}></Orders>
        </StudentViewPage>

    );
}	
