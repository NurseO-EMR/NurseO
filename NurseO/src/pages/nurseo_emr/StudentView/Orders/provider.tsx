import React, { useContext } from 'react';
import Orders from '~/components/EMR/Orders/Orders';
import { OrderType } from "~/core/index";
import StudentViewPage from '../_StudentViewPage';
import { GlobalContext } from '~/services/State';

export default function ProviderOrdersPage() {

    const { patient } = useContext(GlobalContext)

    return (
        <StudentViewPage>
            <Orders showEmpty orderType={OrderType.provider} orders={[...patient.customOrders, ...patient.medicationOrders]}></Orders>
        </StudentViewPage>

    );
}