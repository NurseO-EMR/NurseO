import React from 'react';
import Orders from '../../../Components/Orders/Orders';
import { PatientChart } from "@nurse-o-core/index";
import StudentViewPage from '../_StudentViewPage';

type Props = {
    patient: PatientChart
}
export default class AllOrders extends React.Component<Props> {

    public render() {	
        return (
            <StudentViewPage patient={this.props.patient}>
                <Orders orders={[...this.props.patient.customOrders, ...this.props.patient.medicationOrders]}></Orders>
            </StudentViewPage>

        );
    }	
}