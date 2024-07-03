import React, { useContext } from 'react';
import LabViewer from '../../../Components/Labs/LabViewer';
import StudentViewPage from '../_StudentViewPage';
import { GlobalContext } from '~/Services/State';

export default function ImagingViewerPage() {
    const { patient } = useContext(GlobalContext)

    return (
        <StudentViewPage>
            <LabViewer title='Imaging' docLink={patient.imagingURL}></LabViewer>
        </StudentViewPage>

    );
}