import React, { useContext } from 'react';
import Mar from '~/components/EMR/Mar/Mar';
import StudentViewPage from '../_StudentViewPage';
import { GlobalContext } from '~/services/State';


export default function MARPage() {

    const { patient } = useContext(GlobalContext)

    return (
        <StudentViewPage>
            <Mar orders={patient.medicationOrders} simTime={patient.time}></Mar>
        </StudentViewPage>
    );
}
