import React from 'react';
import VitalsSubmitter from '../../../Components/Reports/ReportsSubmitter';
import { PatientChart } from '../../../Types/PatientProfile';
import StudentViewPage from '../StudentViewPage';

type Props =  {
    patient: PatientChart,
}


export default class VitalsPage extends React.Component<Props> {


    public render() {
        return (
            <StudentViewPage patient={this.props.patient}>
                <VitalsSubmitter reportType={"studentVitalsReport"} className="grid-in-main" />
            </StudentViewPage>
        );
    }
}