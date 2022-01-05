import React from 'react';
import Mar from '../../../Components/Mar/Mar';
import { PatientChart } from '../../../Types/PatientProfile';
import StudentViewPage from '../StudentViewPage';

type Props = {
    patient: PatientChart
}

export default class MARPage extends React.Component<Props> {



    public render() {
        return (
            <StudentViewPage patient={this.props.patient}>
                {this.props.patient ? <Mar orders={this.props.patient!.medicationOrders} simTime={this.props.patient!.time}></Mar>: null }
            </StudentViewPage>
        );
    }
}