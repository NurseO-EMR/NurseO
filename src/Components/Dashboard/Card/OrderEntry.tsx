import React from 'react';
import Database from '../../../Services/Database';
import { CustomOrder, Medication, Order, OrderKind } from 'nurse-o-core';
import MedicationOrderSyntax from "./../../Orders/MedicationOrderSyntax"
import { MedicationOrder } from 'nurse-o-core';
import parse from 'html-react-parser';


type Props = {
    order: Order
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
        if(this.props.order.orderKind === OrderKind.med) {
            const medication = await this.database.getMedicationById((this.props.order as MedicationOrder).id); 
            this.setState({medication})
        }
    }


    public render() {
        return (
            <tr>
                <td className="border-2 p-2">{this.props.order.orderType}</td>
                <td className="border-2 p-2">{this.props.order.orderKind === OrderKind.med && this.state.medication? 
                    <MedicationOrderSyntax order={this.props.order as MedicationOrder} />:
                    <pre>{parse((this.props.order as CustomOrder).order)}</pre>
                }</td>
            </tr>
        );
    }
}