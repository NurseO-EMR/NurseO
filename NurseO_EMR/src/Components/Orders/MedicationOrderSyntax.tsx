import React from 'react';
import Database from '../../Services/Database';
import { Medication, MedicationOrderSyntax as BaseMedicationOrderSyntax, MedicationOrder } from 'nurse-o-core';
type Props = {
    order: MedicationOrder,
    
}
type State = {
    medication:Medication|null
}
export default class MedicationOrderSyntax extends React.Component<Props, State> {

    private database;

    constructor(props:Props) {
        super(props);
        this.state = {
            medication: null
        }
        this.database = Database.getInstance();
    }

    async componentDidMount(){
        const medication = await this.database.getMedicationById(this.props.order.id); 
        this.setState({medication})
    }

    public render() {	
        if(this.state.medication) {
            return (
                <BaseMedicationOrderSyntax med={this.state.medication} order={this.props.order} />

            );
        } else {
            return "loading..."
        }
    }	
}