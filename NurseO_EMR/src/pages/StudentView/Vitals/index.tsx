import React from 'react';
import EmptyCard from '../../../Components/Dashboard/Card/EmptyCard';
import ReportSubmitter from '../../../Components/Reports/ReportsSubmitter';
import StudentViewPage from '../_StudentViewPage';
import { ReportType } from '@nurse-o-core/index';



export default function VitalsSubmitPage() {


    return (
        <StudentViewPage>
            <EmptyCard title="Vitals">
                <ReportSubmitter reportType={ReportType.studentVitalsReport} className="grid-in-main" title="Vitals" viewPageURL="/StudentView/Vitals/view"/>
            </EmptyCard>
        </StudentViewPage>
    );
}
