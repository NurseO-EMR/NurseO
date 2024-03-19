import React from 'react';
import Dashboard from '../../../Components/Dashboard/Dashboard';
import { $patient } from '../../../Services/State';
import { PatientChart } from 'nurse-o-core';
import StudentViewPage from '../StudentViewPage';
import "./../../../index.css";

type Props = {
    patient: PatientChart
}

export default class DashboardPage extends React.Component<Props> {

    private patient:PatientChart | null;

    constructor(props:Props) {
        super(props);
        const getParam:string[] = window.location.href.split("preview=");
        if(getParam.length===2) {
            const decoded = decodeURIComponent(getParam[1])
            const data = JSON.parse(decoded) as PatientChart
            this.patient = data
            $patient.next(this.patient);
        } else {
            this.patient = null;
        }
    }



    public render() {
        return (
            <StudentViewPage patient={this.patient || this.props.patient}>
                <Dashboard patient={this.props.patient} className="grid-in-main" />
            </StudentViewPage>
        );
    }
}