import React, { useContext } from 'react';
import LabViewer from '~/Components/EMR/Labs/LabViewer';
import StudentViewPage from '../_StudentViewPage';
import { GlobalContext } from '~/Services/State';

export default function LabsViewerPage() {
    const { patient } = useContext(GlobalContext)

    return (
        <StudentViewPage>
            <LabViewer title='Labs' docLink={patient.labDocURL}></LabViewer>
        </StudentViewPage>

    );
}