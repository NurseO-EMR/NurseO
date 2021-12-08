import React from 'react';
import ReportSubmitter from '../../../Components/Reports/ReportsSubmitter';
import { PatientChart } from '../../../Types/PatientProfile';
import StudentViewPage from '../StudentViewPage';

type Props =  {
    patient: PatientChart,
}


export default class VitalsPage extends React.Component<Props> {


    public render() {
        return (
            <StudentViewPage patient={this.props.patient}>
                <ReportSubmitter reportType={"studentVitalsReport"} className="grid-in-main" title="Vitals" />
            </StudentViewPage>
        );
    }
}