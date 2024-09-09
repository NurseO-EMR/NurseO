import React from 'react';
import ReportsViewer from '~/components/EMR/Reports/ReportsViewer';
import { ReportType } from "@nurse-o-core/index";
import StudentViewPage from '../_StudentViewPage';

export default function AssessmentViewPage() {

    return (
        <StudentViewPage>
            <ReportsViewer reportType={ReportType.studentAssessmentReport} title={"Vitals"} />
        </StudentViewPage>
    )
}