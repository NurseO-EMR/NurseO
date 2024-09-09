import React, { useContext } from 'react';
import Orders from '~/components/EMR/Orders/Orders';
import { OrderType } from "@nurse-o-core/index";
import StudentViewPage from '../_StudentViewPage';
import { GlobalContext } from '~/services/State';

export default function StandingOrdersPage() {

    const { patient } = useContext(GlobalContext)

    return (
        <StudentViewPage>
            <Orders orderType={OrderType.standing} orders={[...patient.customOrders, ...patient.medicationOrders]}></Orders>
        </StudentViewPage>

    );
}