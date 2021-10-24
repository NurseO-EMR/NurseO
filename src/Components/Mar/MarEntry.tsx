import React from 'react';
import { Medication, Time } from '../../Types/PatientProfile';

type Prop = {
    medication: Medication,
    timeSlots: number[]
}

export default class MarEntry extends React.Component<Prop> {

    public render() {
        let lastRecord:Time = {
            hour: -1,
            minutes: -1
        };
        return (
            <tr className="odd:bg-gray-100 even:bg-gray-300 h-32">
                <td className="w-80 pl-16 font-semibold">
                    {this.props.medication.name} {" "}
                    ({this.props.medication.concentration}){" "}
                    {this.props.medication.route}{" "}
                    {this.props.medication.frequency} {" "}
                    {this.props.medication.routine}  {" "}
                    {this.props.medication.PRNNote}{" "}
                    {this.props.medication.notes}{" "}
                </td>
                {this.props.timeSlots.map((timeSlot,i)=>{
                    let output = "-";
                    
                    for(const marRecord of this.props.medication.mar) {
                        if(marRecord.hour === timeSlot) {
                            output = `Givin at ${marRecord.hour}:${marRecord.minutes.toString().padStart(2,"0")}`
                            lastRecord = marRecord;
                        } else if((lastRecord.hour+4)===timeSlot) {
                            output = `Available at ${marRecord.hour+4}:${marRecord.minutes.toString().padStart(2,"0")}`
                            // lastRecord = marRecord;
                        }
                    }
                    
                    return (<th key={i}>{output}</th>)
                
                })}
            </tr>

        );
    }
}