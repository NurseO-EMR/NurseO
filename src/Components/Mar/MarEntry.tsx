import React from 'react';
import { MedicationOrder, Time } from 'nurse-o-core';
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
            <tr className={`odd:bg-gray-100 even:bg-gray-300 h-32 relative
                ${this.props.order.completed ? `
                after:bg-green-700 after:opacity-30 after:h-full after:w-full 
                after:absolute after:inset-0 after:border-2 after:content-['Completed'] after:text-center 
                after:items-center after:grid after:font-bold after:text-5xl after:z-10` : null}
            `}>
                <td className={`w-80 pl-16 font-semibold relative
                                ${this.props.order.completed ? "line-through" : null}`}>
                    <MedicationOrderSyntax order={this.props.order} />
                </td>
                {this.props.timeSlots.map((hour, i) => {
                    if(hour === this.props.simTime.hour && !this.props.order.completed) {
                        return <td className='font-bold text-center bg-primary/20' key={i}>{this.getTimeSlotValue(hour)} </td>
                    } else {
                        return <td className='font-bold text-center' key={i}>{this.getTimeSlotValue(hour)} </td>
                    }
                    
                }
                )}
            </tr>

        );
    }
}