import React from 'react';
import Database from '../../../Services/Database';
import { Medication } from 'nurse-o-core';
import { MedicationOrder } from 'nurse-o-core';


type Props = {
    medication: MedicationOrder
}

type State = {
    medication:Medication|null
}

export default class MedicationEntry extends React.Component<Props,State> {
    private database;

    constructor(props:Props) {
        super(props);
        this.state = {
            medication: null
        }
        this.database = Database.getInstance();
    }

    async componentDidMount(){
        const medication = await this.database.getMedicationById(this.props.medication.id); 
        this.setState({medication})
    }


    public render() {
        return (
            <tr>
                <td className="border-2 p-2">{this.state.medication?.genericName}</td>
                <td className="border-2 p-2">{this.state.medication?.brandName}</td>
                <td className="border-2 p-2">{this.props.medication.concentration}</td>
                <td className="border-2 p-2">{this.props.medication.route}</td>
                <td className="border-2 p-2">{this.props.medication.frequency}</td>
                <td className="border-2 p-2">{this.props.medication.routine} {this.props.medication.PRNNote}</td>
                <td className="border-2 p-2">{this.props.medication.notes}</td>
            </tr>
        );
    }
}