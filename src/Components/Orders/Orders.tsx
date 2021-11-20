import { filter } from 'lodash';
import React from 'react';
import { MedicationOrder, OrderType } from '../../Types/PatientProfile';
import Card from '../Dashboard/Card/Card';
import OrderEntry from './OrdersEntry';


type Props = {
    className?: string,
    orderType?: OrderType,
    orders: MedicationOrder[] | undefined,
}

type State = {
    filteredOrders: MedicationOrder[] | undefined,
}
export default class Orders extends React.Component<Props, State> {

    constructor(props:Props) {
        super(props)
        if(this.props.orderType) {
            const filteredOrders = filter(this.props.orders, {orderType: this.props.orderType})
            this.state = {filteredOrders}
        } else {
            this.state = {filteredOrders: this.props.orders}
        }
    }

    public render() {	
        return (
            <Card className={this.props.className} title={this.props.orderType? this.props.orderType + " Orders" : "Orders"}>
            <thead className="font-bold">
                <tr>
                    <td className="border-2 p-2">Type</td>
                    <td className="border-2 p-2">Doctor Name</td>
                    <td className="border-2 p-2">Order</td>
                </tr>
            </thead>
            <tbody>
                {this.state.filteredOrders ? 
                    this.state.filteredOrders.map((order,i) => <OrderEntry key={i} order={order}></OrderEntry>): 
                    <tr><td><h1>No orders added</h1></td></tr>
                }
            </tbody>
        </Card>

        );
    }	
}