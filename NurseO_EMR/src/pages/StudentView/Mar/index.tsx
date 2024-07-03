import React, { useContext } from 'react';
import Mar from '../../../Components/Mar/Mar';
import StudentViewPage from '../_StudentViewPage';
import { GlobalContext } from '~/Services/State';


export default function MARPage() {

    const {patient} = useContext(GlobalContext)
    
    return (
        <StudentViewPage>
            <Mar orders={patient.medicationOrders} simTime={patient.time}></Mar>
        </StudentViewPage>
    );
}
