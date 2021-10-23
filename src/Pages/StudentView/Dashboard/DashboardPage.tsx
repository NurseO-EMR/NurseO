import React from 'react';
import Dashboard from '../../../Components/Dashboard/Dashboard';
import { PatientChart } from '../../../Types/PatientProfile';
import StudentViewPage from '../StudentViewPage';

type Props = {
    patient: PatientChart
}

export default class DashboardPage extends React.Component<Props> {



    public render() {
        return (
            <StudentViewPage patient={this.props.patient}>
                <Dashboard patient={this.props.patient} className="grid-in-main" />
            </StudentViewPage>
        );
    }
}