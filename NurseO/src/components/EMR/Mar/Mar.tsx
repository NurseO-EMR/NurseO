import { findIndex, uniq } from 'lodash';
import React, { useContext, useMemo } from 'react';
import type { MedicationOrder, Time } from "~/core/index";
import MarEntry from './MarEntry';
import { GlobalContext } from '~/services/State';
import { api } from '~/utils/api';
import { signInState } from '~/types/flags';

type Props = React.HTMLAttributes<HTMLDivElement> & {
    orders: MedicationOrder[],
    simTime: Time
}

export default function Mar(props: Props) {
    const { patient, setPatient, studentId } = useContext(GlobalContext)
    const timeSlots = useMemo(() => getTimeSlots(props.simTime.hour, props.orders), [props.orders, props.simTime.hour])
    const holdInfo = api.emr.student_updatePatientHoldInfo.useMutation()

    const onMarHoldHandler = (order: MedicationOrder) => {
        const orderIndex = findIndex(patient.medicationOrders, { ...order })
        patient.medicationOrders[orderIndex] = order;
        setPatient(patient)
        if (studentId !== signInState.anonymousSignIn.valueOf()) holdInfo.mutate({ orderId: order.orderId, holdReason: order.holdReason ?? null })

    }

    return (
        <table className={"table-auto w-full " + props.className}>
            <thead className="w-full h-16">
                <tr className="bg-primary text-white">
                    <th>Order</th>
                    <th>Hold</th>
                    <th>Administer</th>
                    {timeSlots.map((time, i) => <th key={i}>{time}:00</th>)}
                </tr>
            </thead>
            <tbody>
                {
                    props.orders.length === 0 ?
                        <tr className="odd:bg-gray-100 even:bg-gray-300 h-32">
                            <td className="w-80 pl-16 font-semibold">No Mar Records Available</td>
                        </tr>
                        : props.orders.map((order, i) =>
                            <MarEntry simTime={props.simTime}
                                timeSlots={timeSlots} key={i} order={order}
                                onHold={onMarHoldHandler}
                            />
                        )
                }
            </tbody>
        </table>

    );
}


function getTimeSlots(hour: number, orders: MedicationOrder[]) {
    let output: number[] = [];
    output = checkForRecordedMarData(output, orders);
    output.push(hour)
    output = uniq(output);
    output = output.sort((a, b) => a - b);
    const lastSlot = output[output.length - 1]
    if (lastSlot) output.push(...[lastSlot + 1, lastSlot + 2])
    return output;
}

function checkForRecordedMarData(timeSlots: number[], orders: MedicationOrder[]) {
    let smallest = Number.MAX_VALUE;
    let biggest = 0;
    for (const medication of orders) {
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
