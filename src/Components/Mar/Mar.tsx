import React from 'react';
import { Medication } from '../../Types/PatientProfile';
import MarEntry from './MarEntry';

type Props = React.HTMLAttributes<HTMLDivElement> & {
    medications: Medication[]
}

export default class Mar extends React.Component<Props> {

    private readonly timeSlotsCount = 2;
    private timeSlots: number[];

    constructor(props:Props) {
        super(props);
        this.timeSlots = this.getTimeSlots();
    }


    getTimeSlots() {
        let smallest = Number.MAX_VALUE;
        let biggest = 0;
        let output = [];
        for(const medication of this.props.medications) {
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
                    <tr className="bg-red-700 text-white">
                        <th></th>
                        {this.timeSlots.map((time,i)=><th key={i}>{time}:00</th>)}
                    </tr>
                </thead>
                <tbody>
                    {
                        this.props.medications.map((medication,i)=><MarEntry timeSlots={this.timeSlots} key={i} medication={medication}></MarEntry>)
                    }
                </tbody>
            </table>

        );
    }
}