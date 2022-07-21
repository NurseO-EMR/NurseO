import { filter } from 'lodash';
import React from 'react';
import { $providerOrdersAvailable } from '../../Services/State';
import { Order, OrderType } from 'nurse-o-core';
import Card from '../Dashboard/Card/Card';
import OrderEntry from './OrdersEntry';


type Props = {
    className?: string,
    orderType?: OrderType,
    orders: Order[] | undefined,
}

type State = {
    filteredOrders: Order[] | undefined,
}
export default class Orders extends React.Component<Props, State> {

    constructor(props:Props) {
        super(props)
        let filteredOrders: Order[] = [];

        // if the order type prop provided then show only that order type
        if(this.props.orderType) {
            filteredOrders = filter(this.props.orders, {orderType: this.props.orderType})
        } else {
            // if no order type provided then check if the provider orders are available 
            if(!$providerOrdersAvailable.value) {
                //if they are not available then show everything except the provider orders ( used for the orders tab)
                filteredOrders = filter(this.props.orders, order=> order.orderType !== OrderType.provider)
            } else {
                // if they are available then show everything
                if(this.props.orders) filteredOrders = this.props.orders
            }
        }
        // the provider order tab is protected by its own component

        this.state = {filteredOrders}
    }

    public render() {	
        console.log(this.props.orders)

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