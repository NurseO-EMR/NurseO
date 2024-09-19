import React from 'react';
import EmptyCard from '~/components/EMR/Dashboard/Card/EmptyCard';
import ReportSubmitter from '~/components/EMR/Reports/ReportsSubmitter';
import StudentViewPage from '../_StudentViewPage';
import { ReportType } from '~/core/index';



export default function VitalsSubmitPage() {


    return (
        <StudentViewPage>
            <EmptyCard title="Vitals">
                <ReportSubmitter reportType={ReportType.studentVitalsReport} className="grid-in-main" title="Vitals" viewPageURL="/nurseo_emr/StudentView/Vitals/view" />
            </EmptyCard>
        </StudentViewPage>
    );
}
