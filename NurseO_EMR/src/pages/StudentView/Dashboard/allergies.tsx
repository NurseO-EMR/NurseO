import React, { useContext } from 'react';
import AllergyCard from '../../../Components/Dashboard/Card/AllergyCard';
import StudentViewPage from '../_StudentViewPage';
import { GlobalContext } from '~/Services/State';


export default function AllergiesPage() {
    const {patient} = useContext(GlobalContext)
    return (
        <StudentViewPage>
            <AllergyCard allergies={patient.allergies} className="grid-in-main" />
        </StudentViewPage>
    );
}
