import React from 'react';
import Database from '../../Services/Database';
import { Medication } from '../../Types/Medications';
import { MedicationOrder, Time } from '../../Types/PatientProfile';

type Props = {
    medication: MedicationOrder,
    timeSlots: number[]
}
type State = {
    medication:Medication|null
}

export default class MarEntry extends React.Component<Props, State> {
    private database;

    constructor(props:Props) {
        super(props);
        this.state = {
            medication: null
        }
        this.database = Database.getInstance();
    }

    async componentDidMount(){
        const medication = await this.database.getMedication(this.props.medication.id); 
        this.setState({medication})
    }

    public render() {
        let lastRecord:Time = {
            hour: -1,
            minutes: -1
        };
        return (
            <tr className="odd:bg-gray-100 even:bg-gray-300 h-32">
                <td className="w-80 pl-16 font-semibold">
                    {this.state.medication?.name} {" "}
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