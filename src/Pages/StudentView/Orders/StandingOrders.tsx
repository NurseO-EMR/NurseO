import React from 'react';
import Orders from '../../../Components/Orders/Orders';
import { OrderType, PatientChart } from '../../../Types/PatientProfile';
import StudentViewPage from '../StudentViewPage';

type Props = {
    patient: PatientChart
}
export default class StandingOrdersPage extends React.Component<Props> {

    public render() {	
        return (
            <StudentViewPage patient={this.props.patient}>
                <Orders orderType={OrderType.standing} orders={this.props.patient!.medicationOrders}></Orders>
            </StudentViewPage>

        );
    }	
}