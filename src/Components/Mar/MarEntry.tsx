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

type TimeSlotStatus = "Givin" | "Available" | "-" | "Due"
export default class MarEntry extends React.Component<Props, State> {

    private timeSlots: Map<number, TimeSlotStatus>;

    constructor(props: Props) {
        super(props);
        this.timeSlots = new Map<number, TimeSlotStatus>();
        this.fillTimeSlots();
        this.checkForRecordedMarData();
        this.checkRoutineConditions();

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
            const { hour } = recordTime;
            this.timeSlots.set(hour, "Givin");
        }
    }

    checkRoutineConditions():void {
        const routine = this.props.order.routine;
        //check if the there is provider order with mar data, then show the mar data but no routine. 
        if(!$providerOrdersAvailable.value && this.props.order.orderType === OrderType.provider) return;

        if (routine === Routine.NOW) {
            const currentState = this.timeSlots.get(this.props.simTime.hour);
            if(currentState === "-") {
                this.timeSlots.set(this.props.simTime.hour, "Due");
            }
        } else if (routine === Routine.PRN || routine=== Routine.Scheduled) {
            const interval = this.getMedQInterval(this.props.order) || 1;
            const lastDoseTime = this.getLastDoseTime();
            const start = lastDoseTime > -1 ? lastDoseTime : this.props.simTime.hour
            for (let i = start; i <= Math.max(...this.props.timeSlots); i = interval + i) {
                const time: Time = { hour: i, minutes: 0 }

                if(this.timeSlots.get(time.hour) !== "Givin") {
                    if(routine === Routine.PRN) this.timeSlots.set(time.hour, "Available")
                    else if(routine === Routine.Scheduled) this.timeSlots.set(time.hour, "Due")
                }
            }
        }
    }

    getLastDoseTime() {
        let lastDoseTime = -1;
        this.timeSlots.forEach((v,k)=>{
            if(v === "Givin" && k > lastDoseTime) {
                lastDoseTime = k
            }
        })
        
        return lastDoseTime;

    }


    getMedQInterval(order: MedicationOrder): number | null {
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

    getOrder() {
        const order = clone(this.props.order);
        if(!$providerOrdersAvailable.value && order.orderType === OrderType.provider) {
            order.routine = Routine.NA
            order.frequency = Frequency.NA
            order.concentration = ""
            return order
        } else return order;
    }



    public render() {

        return (
            <tr className="odd:bg-gray-100 even:bg-gray-300 h-32">
                <td className="w-80 pl-16 font-semibold">
                    <MedicationOrderSyntax order={this.getOrder()} />
                </td>
                {this.props.timeSlots.map((hour, i) => {
                    return <td className='font-bold text-center' key={i}>{this.state.timeSlots.get(hour)} </td>
                }
                )}
            </tr>

        );
    }
}