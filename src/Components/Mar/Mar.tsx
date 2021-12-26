import { filter } from 'lodash';
import React from 'react';
import { $providerOrdersAvailable } from '../../Services/State';
import { MedicationOrder, OrderType } from '../../Types/PatientProfile';
import MarEntry from './MarEntry';

type Props = React.HTMLAttributes<HTMLDivElement> & {
    orders: MedicationOrder[]
}

type State = {
    filteredOrders: MedicationOrder[]
}

export default class Mar extends React.Component<Props, State> {

    private timeSlots: number[];

    constructor(props:Props) {
        super(props);
        this.timeSlots = this.getTimeSlots();

        if($providerOrdersAvailable.value) {
            this.state = {
                filteredOrders: this.props.orders
            }
        } else {
            this.state = {
                filteredOrders: filter(this.props.orders, order=> order.orderType !== OrderType.provider)
            }
        }
    }


    getTimeSlots() {
        let smallest = Number.MAX_VALUE;
        let biggest = 0;
        let output = [];
        for(const medication of this.props.orders) {
            for(const time of medication.mar) {
                if(time.hour > biggest) biggest=time.hour;
                if(time.hour < smallest) smallest=time.hour;
            }
        }

        for(let i = smallest; i<=biggest;i++) {
            output.push(i);
        }

        return output;
        
        
    }


    public render() {
        return (
            <table className={"table-auto w-full " + this.props.className}>
                <thead className="w-full h-16">
                    <tr className="bg-primary text-white">
                        <th></th>
                        {this.timeSlots.map((time,i)=><th key={i}>{time}:00</th>)}
                    </tr>
                </thead>
                <tbody>
                    {
                        this.state.filteredOrders.map((order,i)=><MarEntry timeSlots={this.timeSlots} key={i} order={order}></MarEntry>)
                    }
                </tbody>
            </table>

        );
    }
}