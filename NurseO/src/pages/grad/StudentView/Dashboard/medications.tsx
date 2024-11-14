import React, { useContext } from 'react';
import MedicationCard from '~/components/EMR/Dashboard/Card/MedicationCard';
import StudentViewPage from '../_StudentViewPage';
import { GlobalContext } from '~/services/State';


export default function MedicationsPage() {
    const { patient } = useContext(GlobalContext)
    return (
        <StudentViewPage>
            <MedicationCard medications={patient.medicationOrders} className="grid-in-main" />
        </StudentViewPage>
    );
}
