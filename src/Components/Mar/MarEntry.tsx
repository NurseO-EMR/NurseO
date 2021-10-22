import { find } from 'lodash';
import React from 'react';
import { Medication } from '../../Types/PatientProfile';

type Prop = {
    medication: Medication,
    timeSlots: number[]
}

export default class MarEntry extends React.Component<Prop> {

    public render() {
        return (
            <tr className="odd:bg-gray-100 even:bg-gray-300 h-32">
                <td className="w-80 pl-16 font-semibold">
                    {this.props.medication.name} {" "}
                    ({this.props.medication.concentration}){" "}
                    {this.props.medication.route}{" "}
                    {this.props.medication.frequency} {" "}
                    {this.props.medication.routine} for  {" "}
                    {this.props.medication.PRNNote}{" "}
                    {this.props.medication.notes}{" "}
                </td>
                {this.props.timeSlots.map((timeSlot,i)=>{
                    let output = "-";
                    const marRecord = find(this.props.medication.mar, {hour:timeSlot});
                    if(marRecord !== undefined) {
                        output = `Givin at ${marRecord.hour}:${marRecord.minutes.toString().padStart(2,"0")}`
                    }
                    return (<th key={i}>{output}</th>)
                
                })}
            </tr>

        );
    }
}