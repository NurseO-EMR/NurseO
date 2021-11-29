import React, { ChangeEvent } from 'react';
import { Report } from '../../Types/Report';

type Props = {
    numberOfTimeSlots: number | undefined,
    vital: Report,
    onChange: (filedName: string, timeSlotIndex: number, value: string) => void,
}
export default class ReportInput extends React.Component<Props> {


    onInputChangeHandler(event:ChangeEvent<HTMLInputElement>) {
        const key:number = Number.parseInt(event.target.name);
        const value = event.target.value;
        this.onChangeHandler(value,key);
    }

    onSelectChangeHandler(event:ChangeEvent<HTMLSelectElement>) {
        const key:number = Number.parseInt(event.target.name);
        const value = event.target.value;
        this.onChangeHandler(value,key);
    }

    onCheckboxSelectHandler() {

    }

    onChangeHandler(value: string, key: number) {
        const vitalName = this.props.vital.name;
        this.props.onChange(vitalName,key-1,value);
    }

    public render() {	
        if(this.props.numberOfTimeSlots === undefined) return null;

        return (
            <tr className="w-9/12">
                {[...new Array(this.props.numberOfTimeSlots+1)].map((_,i)=>{
                    if(i === 0) return <td key={i} >{this.props.vital.name}</td>
                    else return <td key={i}>
                        {this.props.vital.fieldType === "text" ? <input name={i.toString()} onChange={this.onInputChangeHandler.bind(this)} className="border-2 w-9/12" type="text" /> : null}
                        {this.props.vital.fieldType === "number" ? <input name={i.toString()}  onChange={this.onInputChangeHandler.bind(this)} className="border-2 w-9/12" type="number" /> : null}
                        {this.props.vital.fieldType === "T/F" ? 
                            <select  name={i.toString()} onChange={this.onSelectChangeHandler.bind(this)} className="border-2 w-9/12">
                                <option></option>
                                <option>Y</option>
                                <option>N</option>
                            </select> : null}
                        {this.props.vital.fieldType === "checkbox" ?
                            <div className="flex flex-wrap gap-5 w-1/2"> 
                                {this.props.vital.VitalsOptions?.map((val,j)=>
                                    <div key={i+j} className="flex items-center gap-2" >
                                        <input type="checkbox" />
                                        <label>{val.abbreviation}</label>
                                    </div>
                                )}
                            </div>
                         : null}
                        {this.props.vital.fieldType === "options" ? 
                            <select  name={i.toString()} onChange={this.onSelectChangeHandler.bind(this)}  className="border-2 w-9/12">
                                <option></option>
                                {this.props.vital.VitalsOptions!.map((val,i)=><option key={i} title={val.name}>{val.abbreviation}</option>)}
                            </select>
                        : null}

                    </td>




                })}
            </tr>

        );  
    }	
}