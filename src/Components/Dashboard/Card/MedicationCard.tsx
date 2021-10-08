import React from 'react';
import { Medication } from '../../../Types/PatientProfile';
import Card from './Card';
import MedicationEntry from './MedicationEntry';

type Props = {
    medications: Medication[] | undefined
}

export default class MedicationCard extends React.Component<Props> {

    public render() {
        return (
            <Card title="Medications">
                <thead className="font-bold">
                    <tr>
                        <td className="border-2 p-2">Name</td>
                        <td className="border-2 p-2">Concentration</td>
                        <td className="border-2 p-2">Route</td>
                        <td className="border-2 p-2">Frequency</td>
                        <td className="border-2 p-2">Routine</td>
                        <td className="border-2 p-2">PRN Note</td>
                        <td className="border-2 p-2">Notes</td>
                    </tr>
                </thead>
                <tbody>
                    {this.props.medications ? 
                        this.props.medications.map(medication => <MedicationEntry medication={medication}></MedicationEntry>): 
                        <h1>No medications added</h1>
                    }
                </tbody>
            </Card>

        );
    }
}