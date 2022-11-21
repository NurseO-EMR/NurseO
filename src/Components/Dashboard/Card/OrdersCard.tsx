import { filter } from 'lodash';
import React from 'react';
import { Order, OrderType } from 'nurse-o-core';
import Card from './Card';
import OrderEntry from '../../Orders/OrdersEntry';

type Props = React.HTMLAttributes<HTMLDivElement> &  {
    medications: Order[],
}

type State = {
    filteredOrders: Order[]
}

export default class OrdersCard extends React.Component<Props, State> {

    
    constructor(props:Props) {
        super(props);

        this.state = {
            filteredOrders: filter(this.props.medications, order=> order.orderType !== OrderType.NA)
        }
    }


    public render() {
        return (
            <Card title="Orders" className={this.props.className}>
                <thead className="font-bold">
                    <tr>
                        <td className="border-2 p-2">Time</td>
                        <td className="border-2 p-2">Order Type</td>
                        <td className="border-2 p-2">Order</td>
                    </tr>
                </thead>
                <tbody>
                    {this.state.filteredOrders && this.state.filteredOrders.length > 0 ? 
                        this.state.filteredOrders.map((order,i) =>
                            <OrderEntry key={i} order={order} />
                        ): 
                        <tr><td colSpan={2}><h1 className='text-center py-2'>No medications added</h1></td></tr>
                    }
                </tbody>
            </Card>

        );
    }
}