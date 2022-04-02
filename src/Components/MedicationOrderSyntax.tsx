import React from 'react';
import {Database} from '../Services/Database.js';
import { Medication } from '../Types/Medications.js';
import { MedicationOrder } from '../Types/PatientProfile.js';

type Props = {
    order: MedicationOrder,
    
}
type State = {
    medication:Medication|null
}
export class MedicationOrderSyntax extends React.Component<Props, State> {

    private database;

    constructor(props:Props) {
        super(props);
        this.state = {
            medication: null
        }
        this.database = Database.getInstance();
    }

    async componentDidMount(){
        const medication = await this.database.getMedication(this.props.order.id); 
        this.setState({medication})
    }

    public render() {	
        return (
            <>
                    {this.state.medication?.name} {" "}
                    {this.props.order.concentration}{" "}
                    {this.props.order.route}{" "}
                    {this.props.order.frequency} {" "}
                    {this.props.order.routine}  {" "}
                    {this.props.order.PRNNote}{" "}
                    {this.props.order.notes ? `(${this.props.order.notes})`: null}
            </>

        );
    }	
}