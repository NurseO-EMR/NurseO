import React from 'react';
import { Medication } from '../../../Types/PatientProfile';


export type Props = {
    medication: Medication
}
export default class MedicationEntry extends React.Component<Props> {

    public render() {
        return (
            <tr>
                <td className="border-2 p-2">{this.props.medication.name}</td>
                <td className="border-2 p-2">{this.props.medication.concentration}</td>
                <td className="border-2 p-2">{this.props.medication.route}</td>
                <td className="border-2 p-2">{this.props.medication.frequency}</td>
                <td className="border-2 p-2">{this.props.medication.routine}</td>
                <td className="border-2 p-2">{this.props.medication.PRNNote}</td>
                <td className="border-2 p-2">({this.props.medication.notes})</td>
            </tr>
        );
    }
}