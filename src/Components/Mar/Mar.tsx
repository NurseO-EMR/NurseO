import { filter, maxBy, uniq } from 'lodash';
import React, { useEffect, useState } from 'react';
import { Frequency, MedicationOrder, OrderType, Routine, Time } from 'nurse-o-core';
import {$providerOrdersAvailable} from "./../../Services/State"
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

    const checkRoutineConditions = (timeSlots: number[]) => {
        for (const order of props.orders) {
            const currentTime = props.simTime.hour;
            if (order.routine === Routine.NOW) timeSlots.push(currentTime);
            if (order.routine === Routine.PRN || order.routine === Routine.Scheduled) {
                const medInterval: number = getMedQInterval(order) || 1;
                const lastDose = maxBy(order.mar, "hour")?.hour || currentTime;
                for (let i = lastDose; i < 24; i = i + medInterval) {
                    timeSlots.push(i)
                }
            }
        }
        return timeSlots;
    }

    const checkFrequencyConditions = (timeSlots: number[]) => {
        for (const order of props.orders) {
            if (order.frequency === Frequency.qd) {
                timeSlots.push(props.simTime.hour)
            } else if (order.frequency === Frequency.qhs) {
                timeSlots.push(21)
            }
        }
        return timeSlots;
    }


    const getMedQInterval = (order: MedicationOrder) => {
        switch (order.frequency) {
            case Frequency.q1hr: return 1;
            case Frequency.q2hr: return 2;
            case Frequency.q3hr: return 3;
            case Frequency.q4hr: return 4;
            case Frequency.q5hr: return 5;
            case Frequency.q6hr: return 6;
            case Frequency.q7hr: return 7;
            case Frequency.q8hr: return 8;
            case Frequency.q9hr: return 9;
            case Frequency.q10hr: return 10;
            case Frequency.q11hr: return 11;
            case Frequency.q12hr: return 12;
            default: return null

        }

    }

    const getTimeSlots = () => {
        let output: number[] = [];
        output = checkForRecordedMarData(output);
        output = checkRoutineConditions(output);
        output = checkFrequencyConditions(output);
        output = uniq(output);
        output = output.sort((a, b) => a - b);
        return output;
    }



    const timeSlots = getTimeSlots();
    const [filteredOrders, setFilteredOrders] = useState<MedicationOrder[]>(getOrders())

    useEffect(()=>{
        const sub = $providerOrdersAvailable.subscribe((providerOrdersAvailable)=>{
            if(providerOrdersAvailable) {
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

                        :  filteredOrders.map((order, i) =>  <MarEntry simTime={props.simTime} timeSlots={timeSlots} key={i} order={order} onLocateClick={console.log} />)
                }
            </tbody>
        </table>

    );
}
