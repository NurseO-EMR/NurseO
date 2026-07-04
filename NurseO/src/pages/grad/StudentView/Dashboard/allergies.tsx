import React, { useContext } from 'react';
import AllergyCard from '~/components/EMR/Dashboard/Card/AllergyCard';
import StudentViewPage from '../_StudentViewPage';
import { GlobalContext } from '~/services/State';


export default function AllergiesPage() {
    const { patient } = useContext(GlobalContext)
    return (
        <StudentViewPage>
            <AllergyCard allergies={patient.allergies} className="grid-in-main" />
        </StudentViewPage>
    );
}
