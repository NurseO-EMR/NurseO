import React from 'react';
import AdministerMeds from '../../../Components/Mar/AdministerMeds';
import { PatientChart } from '../../../Types/PatientProfile';
import StudentViewPage from '../StudentViewPage';

type Props = {
    patient: PatientChart
}
export default class Name extends React.Component<Props> {

    public render() {	
        return (
            <StudentViewPage patient={this.props.patient}>
                <AdministerMeds patient={this.props.patient} />
            </StudentViewPage>

        );
    }	
}