import React, { useContext } from 'react';
import LabViewer from '~/components/EMR/Labs/LabViewer';
import StudentViewPage from '../_StudentViewPage';
import { GlobalContext } from '~/services/State';

export default function LabsViewerPage() {
    const { patient } = useContext(GlobalContext)

    return (
        <StudentViewPage>
            <LabViewer title='Labs' docLink={patient.labDocURL}></LabViewer>
        </StudentViewPage>

    );
}