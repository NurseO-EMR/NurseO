import { findIndex, uniq } from 'lodash';
import React from 'react';
import { MedicationOrder, Time } from "@nurse-o-core/index";
import MarEntry from './MarEntry';
import { $patient } from '../../Services/State';
import Database from '../../Services/Database';

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
        this.state = {
            filteredOrders: this.props.orders
        }
    }

    getTimeSlots() {

        let output: number[] = [];
        output = this.checkForRecordedMarData(output);
        output.push(this.props.simTime.hour)
        output = uniq(output);
        output = output.sort((a,b) => a - b);
        const lastSlot = output[output.length-1]
        output.push(...[lastSlot+1, lastSlot+2])
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

    async onMarUpdateHandler(order:MedicationOrder) {
        const patient = $patient.value
        const db = Database.getInstance()
        const orderIndex = findIndex(patient.medicationOrders, {...order})
        patient.medicationOrders[orderIndex] = order;
        $patient.next(patient)
        await db.updatePatient()

    }
    


    public render() {
        return (
            <table className={"table-auto w-full " + this.props.className}>
                <thead className="w-full h-16">
                    <tr className="bg-primary text-white">
                        <th>Order</th>
                        <th>Hold</th>
                        <th>Administer</th>
                        {this.timeSlots.map((time, i) => <th key={i}>{time}:00</th>)}
                    </tr>
                </thead>
                <tbody>
                    {
                        this.state.filteredOrders.length === 0 ?
                            <tr className="odd:bg-gray-100 even:bg-gray-300 h-32">
                                <td className="w-80 pl-16 font-semibold">No Mar Records Available</td>
                            </tr>
                            : this.state.filteredOrders.map((order, i) => 
                            <MarEntry simTime={this.props.simTime}
                             timeSlots={this.timeSlots} key={i} order={order}
                             onUpdate={this.onMarUpdateHandler.bind(this)}
                             />
                            )
                    }
                </tbody>
            </table>

        );
    }
}