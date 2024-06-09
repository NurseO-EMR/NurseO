import React from 'react';
import MedicationCard from '../../../Components/Dashboard/Card/MedicationCard';
import { type PatientChart } from "@nurse-o-core/index";
import StudentViewPage from '../_StudentViewPage';

type Props = {
    patient: PatientChart
}

export default function MedicationsPage(props: Props) {

    return (
        <StudentViewPage>
            <MedicationCard medications={props.patient?.medicationOrders} className="grid-in-main" />
        </StudentViewPage>
    );
}
