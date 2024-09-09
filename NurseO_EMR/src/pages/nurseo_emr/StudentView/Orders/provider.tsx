import React, { useContext } from 'react';
import Orders from '~/Components/EMR/Orders/Orders';
import { OrderType } from "@nurse-o-core/index";
import StudentViewPage from '../_StudentViewPage';
import { GlobalContext } from '~/Services/State';

export default function ProviderOrdersPage() {

    const { patient } = useContext(GlobalContext)

    return (
        <StudentViewPage>
            <Orders orderType={OrderType.provider} orders={[...patient.customOrders, ...patient.medicationOrders]}></Orders>
        </StudentViewPage>

    );
}