import React from 'react';
import EmptyCard from '~/components/EMR/Dashboard/Card/EmptyCard';
import ReportSubmitter from '~/components/EMR/Reports/ReportsSubmitter';
import StudentViewPage from '../_StudentViewPage';
import { ReportType } from '~/core/index';


export default function AssessmentSubmitPage() {


    return (
        <StudentViewPage>
            <EmptyCard title="Assessments">
                <ReportSubmitter reportType={ReportType.studentAssessmentReport} className="grid-in-main" title="Assessment" viewPageURL="/nurseo_emr/StudentView/Assessments/view" />
            </EmptyCard>
        </StudentViewPage>
    );
}
