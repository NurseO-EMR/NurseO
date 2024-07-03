import React from 'react';
import type { MedicationOrder, Time } from '@nurse-o-core/index';
import { MarEntry } from './MarEntry';

type Props = React.HTMLAttributes<HTMLDivElement> & {
    orders: MedicationOrder[],
    simTime: Time
}

export function Mar(props: Props) {


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
        output = [... new Set(output)]
        output = output.sort((a, b) => a - b);
        const lastHour = output[output.length-1]
        if (lastHour) output.push(...[lastHour+1, lastHour+2])
        return output;
    }



    const timeSlots = getTimeSlots();



    return (
        <table className={"table-auto w-full "}>
            <thead className="w-full h-16">
                <tr className="bg-primary text-white">
                    <th>Medication</th>
                    {timeSlots.map((time, i) => <th key={i}>{time}:00</th>)}
                    <th>Locate</th>
                </tr>
            </thead>
            <tbody>
                {
                    props.orders.length === 0 ?
                        <tr className="odd:bg-gray-100 even:bg-gray-300 h-32">
                            <td className="w-80 pl-16 font-semibold">No Mar Records Available</td>
                        </tr>

                        : props.orders.map((order, i) => <MarEntry simTime={props.simTime} timeSlots={timeSlots} key={i} order={order} onLocateClick={console.log} />)
                }
            </tbody>
        </table>

    );
}
