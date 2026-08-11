import React, { useContext } from 'react';
import Orders from '~/components/EMR/Orders/Orders';
import StudentViewPage from '../_StudentViewPage';
import { GlobalContext } from '~/services/State';


export default function AllOrders() {

    const { patient } = useContext(GlobalContext)

    return (
        <StudentViewPage title='All Orders'>
            <Orders showEmpty orders={[...patient.customOrders, ...patient.medicationOrders]}></Orders>
        </StudentViewPage>

    );
}	
