import React from 'react';
import { ReportType } from "~/core/index";
import StudentViewPage from '../_StudentViewPage';
import ReportSubmitter from "~/components/EMR/Reports/ReportsSubmitter";


export default function IORecordSubmitPage() {

    return (
        <StudentViewPage>
            <ReportSubmitter reportType={ReportType.studentIOReport} className="grid-in-main" title="Scales" viewPageURL="/nurseo_emr/StudentView/IORecord/view" />
        </StudentViewPage>
    );
}
