import React from 'react';
import EmptyCard from '../../../Components/Dashboard/Card/EmptyCard';
import ReportSubmitter from '../../../Components/Reports/ReportsSubmitter';
import StudentViewPage from '../_StudentViewPage';
import { ReportType } from '@nurse-o-core/index';


export default function AssessmentSubmitPage() {


    return (
        <StudentViewPage>
            <EmptyCard title="Assessments">
                <ReportSubmitter reportType={ReportType.studentAssessmentReport} className="grid-in-main" title="Assessment" viewPageURL="/StudentView/Assessments/view" />
            </EmptyCard>
        </StudentViewPage>
    );
}
