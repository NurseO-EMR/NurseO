import React from 'react';
import { type Order } from '@nurse-o-core/index';
import Card from './Card';
import OrderEntry from '../../Orders/OrdersEntry';

type Props = React.HTMLAttributes<HTMLDivElement> & {
    orders: Order[],
}

export default function OrdersCard(props: Props) {

    return (
        <Card title="Orders" className={props.className}>
            <thead className="font-bold">
                <tr>
                    <td className="border-2 p-2">Time</td>
                    <td className="border-2 p-2">Order Type</td>
                    <td className="border-2 p-2">Order</td>
                </tr>
            </thead>
            <tbody>
                {props.orders && props.orders.length > 0 ?
                    props.orders.map((order, i) =>
                        <OrderEntry key={i} order={order} />
                    ) :
                    <tr><td colSpan={2}><h1 className='text-center py-2'>No orders added</h1></td></tr>
                }
            </tbody>
        </Card>

    );
}
