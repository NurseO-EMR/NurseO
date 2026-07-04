import React from 'react';
import ReportSubmitter from '~/components/EMR/Reports/ReportsSubmitter';
import StudentViewPage from '../_StudentViewPage';
import { ReportType } from '~/core/index';


export default function AssessmentSubmitPage() {


    return (
        <StudentViewPage>
            <ReportSubmitter reportType={ReportType.studentAssessmentReport} className="grid-in-main" title="Assessment" viewPageURL="/grad/StudentView/Assessments/view" />
        </StudentViewPage>
    );
}
