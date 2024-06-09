import React from 'react';
import AdministerMeds from '../../../Components/Mar/AdministerMeds';
import { PatientChart } from "@nurse-o-core/index";
import StudentViewPage from '../_StudentViewPage';

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