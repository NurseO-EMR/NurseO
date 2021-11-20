import React from 'react';
import Orders from '../../../Components/Dashboard/Card/Orders/Orders';
import { OrderType, PatientChart } from '../../../Types/PatientProfile';
import StudentViewPage from '../StudentViewPage';

type Props = {
    patient: PatientChart
}
export default class AdmissionOrdersPage extends React.Component<Props> {

    public render() {	
        return (
            <StudentViewPage patient={this.props.patient}>
                <Orders orderType={OrderType.admission} orders={this.props.patient!.medicationOrders}></Orders>
            </StudentViewPage>

        );
    }	
}