import React from 'react';
import { Medication } from '../Types/Medications.js';
import { MedicationOrder } from '../Types/PatientProfile.js';

type Props = {
    order: MedicationOrder,
    medName: string
    
}
type State = {
    medication:Medication|null
}
export class MedicationOrderSyntax extends React.Component<Props, State> {


    public render() {	
        return (
            <>
                    {this.props.medName} {" "}
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