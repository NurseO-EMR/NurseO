import React from 'react';
import ReportSubmitter from '~/components/EMR/Reports/ReportsSubmitter';
import StudentViewPage from '../_StudentViewPage';
import { ReportType } from '~/core/index';



export default function VitalsSubmitPage() {


    return (
        <StudentViewPage>
            <ReportSubmitter reportType={ReportType.studentVitalsReport} className="grid-in-main" title="Vitals" viewPageURL="/nurseo_emr/StudentView/Vitals/view" />
        </StudentViewPage>
    );
}
