import React, { useContext } from 'react';
import LabViewer from '~/components/EMR/Labs/LabViewer';
import StudentViewPage from '../_StudentViewPage';
import { GlobalContext } from '~/services/State';

export default function ImagingViewerPage() {
    const { patient } = useContext(GlobalContext)

    return (
        <StudentViewPage>
            <LabViewer title='Imaging' docLink={patient.imagingURL}></LabViewer>
        </StudentViewPage>

    );
}