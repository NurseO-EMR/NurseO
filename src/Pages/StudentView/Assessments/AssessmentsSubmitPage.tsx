import React from 'react';
import EmptyCard from '../../../Components/Dashboard/Card/EmptyCard';
import ReportSubmitter from '../../../Components/Reports/ReportsSubmitter';
import { PatientChart } from 'nurse-o-core';
import StudentViewPage from '../StudentViewPage';

type Props =  {
    patient: PatientChart,
}


export default class AssessmentSubmitPage extends React.Component<Props> {


    public render() {
        return (
            <StudentViewPage patient={this.props.patient}>
                <EmptyCard title="Assessments">
                    <ReportSubmitter reportType={"studentAssessmentReport"} className="grid-in-main" title="Assessment" />
                </EmptyCard>
            </StudentViewPage>
        );
    }
}