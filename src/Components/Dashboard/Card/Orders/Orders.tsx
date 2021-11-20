import React from 'react';
import { MedicationOrder, OrderType } from '../../../../Types/PatientProfile';
import Card from '../Card';
import OrderEntry from './OrdersEntry';


type Props = {
    className?: string,
    orderType: OrderType,
    orders: MedicationOrder[],
}
export default class Orders extends React.Component<Props> {

    public render() {	
        return (
            <Card className={this.props.className} title="Flags">
            <thead className="font-bold">
                <tr>
                    <td className="border-2 p-2">Type</td>
                    <td className="border-2 p-2">Doctor Name</td>
                    <td className="border-2 p-2">Order</td>
                </tr>
            </thead>
            <tbody>
                {this.props.orders ? 
                    this.props.orders.map((order,i) => <OrderEntry key={i} order={order}></OrderEntry>): 
                    <tr><td><h1>No orders added</h1></td></tr>
                }
            </tbody>
        </Card>

        );
    }	
}