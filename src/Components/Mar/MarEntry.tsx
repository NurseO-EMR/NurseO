import { clone } from 'lodash';
import React from 'react';
import { $providerOrdersAvailable } from '../../Services/State';
import { Frequency, MedicationOrder, OrderType, Routine, Time } from 'nurse-o-core';
import MedicationOrderSyntax from '../Orders/MedicationOrderSyntax';

type Props = {
    order: MedicationOrder,
    timeSlots: number[],
    simTime: Time
}

type State = {
    timeSlots: Map<number, TimeSlotStatus>
}

type TimeSlotStatus = string | "Available" | "-" | "Due"
export default class MarEntry extends React.Component<Props, State> {

    private timeSlots: Map<number, TimeSlotStatus>;

    constructor(props: Props) {
        super(props);
        this.timeSlots = new Map<number, TimeSlotStatus>();
        this.fillTimeSlots();
        this.checkForRecordedMarData();
        this.state = {
            timeSlots: this.timeSlots
        }
    }

    fillTimeSlots() {
        for (const timeSlot of this.props.timeSlots) {
            this.timeSlots.set(timeSlot, "-")
        }
        return this.timeSlots
    }

    checkForRecordedMarData() {
        for (const recordTime of this.props.order.mar) {
            const { hour, minutes } = recordTime;
            this.timeSlots.set(hour, `${hour.toString().padStart(2,"0")}:${minutes.toString().padStart(2,"0")}`);                
        }
    }



    getOrder() {
        const order = clone(this.props.order);
        if(!$providerOrdersAvailable.value && order.orderType === OrderType.provider) {
            order.routine = Routine.NA
            order.frequency = Frequency.NA
            order.concentration = ""
            return order
        } else return order;
    }

    isMedGivin(status:TimeSlotStatus) {
        return status!=="Available" && status!=="-" && status !== "Due"
    }

    getTimeSlotValue(hour:number) {
        const value =  this.timeSlots.get(hour);
        if(!value) return <span>Error</span>
        if(this.isMedGivin(value)) {
            return <span>{value} <br /> - LK</span>
        } else {
            return <span>{value}</span>
        }

    }




    public render() {

        return (
            <tr className="odd:bg-gray-100 even:bg-gray-300 h-32">
                <td className="w-80 pl-16 font-semibold">
                    <MedicationOrderSyntax order={this.getOrder()} />
                </td>
                {this.props.timeSlots.map((hour, i) => {
                    return <td className='font-bold text-center' key={i}>{this.getTimeSlotValue(hour)} </td>
                }
                )}
            </tr>

        );
    }
}