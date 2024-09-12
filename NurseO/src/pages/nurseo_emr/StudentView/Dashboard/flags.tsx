import React, { useContext } from 'react';
import FlagsCard from '~/components/EMR/Dashboard/Card/FlagsCard';
import StudentViewPage from '../_StudentViewPage';
import { GlobalContext } from '~/services/State';

export default function FlagsPage() {
    const { patient } = useContext(GlobalContext)


    return (
        <StudentViewPage>
            <FlagsCard flags={patient.flags} className="grid-in-main" />
        </StudentViewPage>
    );
}
