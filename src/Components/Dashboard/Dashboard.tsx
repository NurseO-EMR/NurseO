import React from 'react';
import { Medication, PatientChart } from '../../Types/PatientProfile';
import Card from './Card/Card';
import MedicationEntry from './Card/MedicationEntry';

type Props = React.HTMLAttributes<HTMLDivElement> & {
    patient: PatientChart
}

export default class Dashboard extends React.Component<Props> {

    
    public render() {
        return (
            <Card title="Medications">
                {this.props.patient?.medications.map(medication => <MedicationEntry medication={medication}></MedicationEntry>)}
                

            </Card>

        );
    }
}