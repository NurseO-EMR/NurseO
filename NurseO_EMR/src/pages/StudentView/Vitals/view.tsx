import React, { useContext, useMemo } from 'react';
import ReportsViewer from '../../../Components/Reports/ReportsViewer';
import StudentViewPage from '../_StudentViewPage';
import { GlobalContext } from '~/Services/State';

export default function VitalsViewPage() {

    const { patient } = useContext(GlobalContext)
    const vitalsReport = useMemo(() => patient.studentReports.filter(r => r.reportType === "studentVitalsReport"), [patient])

    return (
        <StudentViewPage>
            <ReportsViewer showNotes studentReport={vitalsReport} title={"Vitals"} />
        </StudentViewPage>

    );
}	
