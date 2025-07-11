import React from 'react';
import EmptyCard from '~/components/EMR/Dashboard/Card/EmptyCard';
import { ReportType } from "~/core/index";
import StudentViewPage from '../_StudentViewPage';
import ReportSubmitter from "~/components/EMR/Reports/ReportsSubmitter";


export default function IORecordSubmitPage() {

    return (
        <StudentViewPage>
            <EmptyCard title="Scales">
                <ReportSubmitter reportType={ReportType.studentIOReport} className="grid-in-main" title="Scales" viewPageURL="/grad/StudentView/IORecord/view" />
            </EmptyCard>
        </StudentViewPage>
    );
}
