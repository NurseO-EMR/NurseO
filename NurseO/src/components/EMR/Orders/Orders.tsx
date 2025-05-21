import { filter } from 'lodash';
import React, { useEffect, useMemo, useState } from 'react';
import type { Order, OrderType } from "~/core/index";
import Card from '../Dashboard/Card/Card';
import OrderEntry from './OrdersEntry';


type Props = {
    className?: string,
    orderType?: OrderType,
    orders: Order[] | undefined,
    showEmpty?: boolean
    title?: string
}

export default function Orders(props: Props) {

    const [filteredOrders, setFilteredOrders] = useState<Order[]>()
    const showICD10Column = useMemo(() => props.orders?.filter(o => o.icd10).length, [props.orders])

    useEffect(() => {
        let temp;
        if (props.orderType) {
            temp = filter(props.orders, order => order.orderType === props.orderType)
        } else {
            temp = props.orders ?? []
        }

        setFilteredOrders([...temp])
    }, [props.orderType, props.orders])




    if (props.showEmpty && filteredOrders?.length === 0) {
        return <></>;
    }
    return (
        <Card className={props.className} title={props.orderType ? props.orderType + " Orders" : (props.title ? props.title : "Orders")}>
            <thead className="font-bold">
                <tr>
                    <td className="border-2 p-2 border-trueGray-200">Time</td>
                    <td className="border-2 p-2 border-trueGray-200">Type</td>
                    <td className="border-2 p-2 border-trueGray-200">Order</td>
                    {showICD10Column ? <td className="border-2 p-2 border-trueGray-200">ICD10 Description</td> : null}
                </tr>
            </thead>
            <tbody>
                {filteredOrders && filteredOrders.length > 0 ?
                    filteredOrders.map((order, i) => <OrderEntry showICD10Column={!!showICD10Column} key={i} order={order}></OrderEntry>) :
                    <tr><td colSpan={showICD10Column ? 4 : 3} className='p-2'><h1>No orders added</h1></td></tr>
                }
            </tbody>
        </Card>

    );
}
