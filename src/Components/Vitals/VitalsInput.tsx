import React from 'react';
import { Vital } from '../../Types/Vitals';

type Props = {
    numberOfTimeSlots: number | undefined,
    vital: Vital
}
export default class VitalsInput extends React.Component<Props> {

    public render() {	
        if(this.props.numberOfTimeSlots === undefined) return null;

        return (
            <tr className=" w-9/12">
                {[...new Array(this.props.numberOfTimeSlots+1)].map((val,i)=>{
                    if(i === 0) return <td key={i}>{this.props.vital.name}</td>
                    else return <td key={i}>
                        {this.props.vital.fieldType === "text" ? <input className="border-2 w-9/12" type="text" /> : null}
                        {this.props.vital.fieldType === "number" ? <input className="border-2 w-9/12" type="number" /> : null}
                        {this.props.vital.fieldType === "T/F" ? 
                            <select className="border-2 w-9/12">
                                <option></option>
                                <option>Y</option>
                                <option>N</option>
                            </select> : null}
                        {this.props.vital.fieldType === "options" ? 
                            <select className="border-2 w-9/12">
                                <option></option>
                                {this.props.vital.VitalsOptions!.map(val=><option title={val.name}>{val.abbreviation}</option>)}
                            </select>
                        : null}

                    </td>




                })}
            </tr>

        );  
    }	
}