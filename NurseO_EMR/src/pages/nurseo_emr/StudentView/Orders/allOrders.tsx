import React, { useContext } from 'react';
import Orders from '~/Components/EMR/Orders/Orders';
import StudentViewPage from '../_StudentViewPage';
import { GlobalContext } from '~/Services/State';


export default function AllOrders() {

    const { patient } = useContext(GlobalContext)

    return (
        <StudentViewPage>
            <Orders orders={[...patient.customOrders, ...patient.medicationOrders]}></Orders>
        </StudentViewPage>

    );
}	
