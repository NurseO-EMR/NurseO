import { filter } from 'lodash';
import React from 'react';
import type { Order, OrderType } from "@nurse-o-core/index";
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

    constructor(props: Props) {
        super(props)
        let filteredOrders: Order[] = [];

        // if the order type prop provided then show only that order type
        if (this.props.orderType) {
            filteredOrders = filter(this.props.orders, order => order.orderType === this.props.orderType)
        } else {
            filteredOrders = props.orders ?? []
        }

        this.state = { filteredOrders }
    }

    public render() {
        return (
            <Card className={this.props.className} title={this.props.orderType ? this.props.orderType + " Orders" : "Orders"}>
                <thead className="font-bold">
                    <tr>
                        <td className="border-2 p-2 border-trueGray-200">Type</td>
                        <td className="border-2 p-2 border-trueGray-200">Order</td>
                    </tr>
                </thead>
                <tbody>
                    {this.state.filteredOrders && this.state.filteredOrders.length > 0 ?
                        this.state.filteredOrders.map((order, i) => <OrderEntry key={i} order={order}></OrderEntry>) :
                        <tr><td className='p-2'><h1>No orders added</h1></td></tr>
                    }
                </tbody>
            </Card>

        );
    }
}