import React from 'react';
import EmptyCard from '../../../Components/Dashboard/Card/EmptyCard';
import { PatientChart } from '../../../Types/PatientProfile';
import StudentViewPage from '../StudentViewPage';
import ReportSubmitter from "./../../../Components/Reports/ReportsSubmitter";

type Props = {
    patient: PatientChart
}

export default class ScalesSubmitPage extends React.Component<Props> {

    public render() {
        return (
            <StudentViewPage patient={this.props.patient}>
                <EmptyCard title="Scales">
                    <ReportSubmitter reportType={"studentScalesReport"} className="grid-in-main" title="Scales"  />
                </EmptyCard>
            </StudentViewPage>
        );
    }
}