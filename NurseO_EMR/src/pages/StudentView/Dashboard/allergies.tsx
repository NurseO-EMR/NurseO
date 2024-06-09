import React from 'react';
import AllergyCard from '../../../Components/Dashboard/Card/AllergyCard';
import { type PatientChart } from "@nurse-o-core/index";
import StudentViewPage from '../_StudentViewPage';

type Props = {
    patient: PatientChart
}

export default function AllergiesPage(props: Props) {



    return (
        <StudentViewPage>
            <AllergyCard allergies={props.patient?.allergies} className="grid-in-main" />
        </StudentViewPage>
    );
}
