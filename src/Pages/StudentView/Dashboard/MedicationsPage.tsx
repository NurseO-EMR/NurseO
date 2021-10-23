import React from 'react';
import MedicationCard from '../../../Components/Dashboard/Card/MedicationCard';
import { PatientChart } from '../../../Types/PatientProfile';
import StudentViewPage from '../StudentViewPage';

type Props = {
    patient: PatientChart
}

export default class MedicationsPage extends React.Component<Props> {



    public render() {
        return (
            <StudentViewPage patient={this.props.patient}>
                <MedicationCard medications={this.props.patient?.medications} className="grid-in-main" />
            </StudentViewPage>
        );
    }
}