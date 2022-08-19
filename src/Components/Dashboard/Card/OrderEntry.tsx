import React from 'react';
import Database from '../../../Services/Database';
import { CustomOrder, Medication, MedicationOrderSyntax, Order, OrderKind } from 'nurse-o-core';
import { MedicationOrder } from 'nurse-o-core';


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

    // async componentDidMount(){
    //     const medication = await this.database.getMedication(this.props.order.id); 
    //     this.setState({medication})
    // }


    public render() {
        return (
            <tr>
                <td className="border-2 p-2">{this.props.order.orderType}</td>
                <td className="border-2 p-2">{this.props.order.orderKind === OrderKind.med ? 
                    <MedicationOrderSyntax order={this.props.order as MedicationOrder} medName=""/>:
                    <pre>{(this.props.order as CustomOrder).order}</pre>
                }</td>
            </tr>
        );
    }
}