import React from 'react';
import EmptyCard from '../../../Components/Dashboard/Card/EmptyCard';
import ReportSubmitter from '../../../Components/Reports/ReportsSubmitter';
import { PatientChart } from 'nurse-o-core';
import StudentViewPage from '../StudentViewPage';

type Props =  {
    patient: PatientChart,
}


export default class VitalsPage extends React.Component<Props> {


    public render() {
        return (
            <StudentViewPage patient={this.props.patient}>
                <EmptyCard title="Vitals">
                    <ReportSubmitter reportType={"studentVitalsReport"} className="grid-in-main" title="Vitals" />
                </EmptyCard>
            </StudentViewPage>
        );
    }
}