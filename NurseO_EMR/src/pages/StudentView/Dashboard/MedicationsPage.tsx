import React from 'react';
import MedicationCard from '../../../Components/Dashboard/Card/MedicationCard';
import { PatientChart } from "@nurse-o-core/index";
import StudentViewPage from '../_StudentViewPage';

type Props = {
    patient: PatientChart
}

export default class MedicationsPage extends React.Component<Props> {



    public render() {
        return (
            <StudentViewPage patient={this.props.patient}>
                <MedicationCard medications={this.props.patient?.medicationOrders} className="grid-in-main" />
            </StudentViewPage>
        );
    }
}