import { filter, uniq } from 'lodash';
import React, { useEffect, useState } from 'react';
import { MedicationOrder, OrderType, Time } from 'nurse-o-core';
import { $providerOrdersAvailable } from "./../../Services/State"
import { MarEntry } from './MarEntry';

type Props = React.HTMLAttributes<HTMLDivElement> & {
    orders: MedicationOrder[],
    simTime: Time
}

export function Mar(props: Props) {

    const getOrders = () => {
        if ($providerOrdersAvailable.value) return props.orders
        else return filter(props.orders, order => order.orderType !== OrderType.provider || order.mar.length > 0)
    }

    const checkForRecordedMarData = (timeSlots: number[]) => {
        let smallest = Number.MAX_VALUE;
        let biggest = 0;
        for (const medication of props.orders) {
            for (const time of medication.mar) {
                if (time.hour > biggest) biggest = time.hour;
                if (time.hour < smallest) smallest = time.hour;
            }
        }

        for (let i = smallest; i <= biggest; i++) {
            timeSlots.push(i);
        }
        return timeSlots;
    }

    const getTimeSlots = () => {
        let output: number[] = [];
        output = checkForRecordedMarData(output);
        output.push(props.simTime.hour)
        output = uniq(output);
        output = output.sort((a, b) => a - b);
        return output;
    }



    const timeSlots = getTimeSlots();
    const [filteredOrders, setFilteredOrders] = useState<MedicationOrder[]>(getOrders())

    useEffect(() => {
        const sub = $providerOrdersAvailable.subscribe((providerOrdersAvailable) => {
            if (providerOrdersAvailable) {
                setFilteredOrders(props.orders)
            }
        })

        return sub.unsubscribe()
    })


    return (
        <table className={"table-auto w-full "}>
            <thead className="w-full h-16">
                <tr className="bg-primary text-white">
                    <th></th>
                    {timeSlots.map((time, i) => <th key={i}>{time}:00</th>)}
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {
                    timeSlots.length === 0 ?
                        <tr className="odd:bg-gray-100 even:bg-gray-300 h-32">
                            <td className="w-80 pl-16 font-semibold">No Mar Records Available</td>
                        </tr>

                        : filteredOrders.map((order, i) => <MarEntry simTime={props.simTime} timeSlots={timeSlots} key={i} order={order} onLocateClick={console.log} />)
                }
            </tbody>
        </table>

    );
}
