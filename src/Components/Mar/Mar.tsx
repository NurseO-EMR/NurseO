import { filter } from 'lodash';
import React from 'react';
import { $providerOrdersAvailable } from '../../Services/State';
import { Frequency, MedicationOrder, OrderType, Routine, Time } from '../../Types/PatientProfile';
import MarEntry from './MarEntry';

type Props = React.HTMLAttributes<HTMLDivElement> & {
    orders: MedicationOrder[],
    simTime: Time
}

type State = {
    filteredOrders: MedicationOrder[]
}

export default class Mar extends React.Component<Props, State> {

    private timeSlots: number[];

    constructor(props: Props) {
        super(props);
        this.timeSlots = this.getTimeSlots();

        if ($providerOrdersAvailable.value) {
            this.state = {
                filteredOrders: this.props.orders
            }
        } else {
            this.state = {
                filteredOrders: filter(this.props.orders, order => order.orderType !== OrderType.provider)
            }
        }
    }


    getTimeSlots() {

        let output: number[] = [];
        output = this.checkForRecordedMarData(output);
        output = this.checkRoutineConditions(output);
        output = this.checkFrequencyConditions(output);
        return output;
    }

    checkForRecordedMarData(timeSlots: number[]) {
        let smallest = Number.MAX_VALUE;
        let biggest = 0;
        for (const medication of this.props.orders) {
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

    checkRoutineConditions(timeSlots: number[]) {
        for(const order of this.props.orders) {
            const currentTime = this.props.simTime.hour;
            console.log(order.routine === Routine.PRN)
            if(order.routine === Routine.NOW) timeSlots.push(currentTime);
            if(order.routine === Routine.PRN || order.routine === Routine.Scheduled) {
                const medInterval = this.getMedQInterval(order) || 1;
                for(let i = currentTime; i < 24; i=i+medInterval) {
                    timeSlots.push(i)
                }
            }
        }
        return timeSlots;
    }

    checkFrequencyConditions(timeSlots: number[]) {
        for(const order of this.props.orders) {
            if(order.frequency === Frequency.qd) {
                timeSlots.push(this.props.simTime.hour)
            } else if(order.frequency === Frequency.qhs){
                timeSlots.push(21)
            }
        }
        return timeSlots;
    }


    getMedQInterval(order:MedicationOrder): number | null {
        switch(order.frequency) {
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


    public render() {
        return (
            <table className={"table-auto w-full " + this.props.className}>
                <thead className="w-full h-16">
                    <tr className="bg-primary text-white">
                        <th></th>
                        {this.timeSlots.map((time, i) => <th key={i}>{time}:00</th>)}
                    </tr>
                </thead>
                <tbody>
                    {
                        this.timeSlots.length === 0 ?
                            <tr className="odd:bg-gray-100 even:bg-gray-300 h-32">
                                <td className="w-80 pl-16 font-semibold">No Mar Records Available</td>
                            </tr>


                            : this.state.filteredOrders.map((order, i) => <MarEntry timeSlots={this.timeSlots} key={i} order={order}></MarEntry>)
                    }
                </tbody>
            </table>

        );
    }
}