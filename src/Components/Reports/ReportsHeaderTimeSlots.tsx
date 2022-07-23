import React, { ChangeEvent } from 'react';

type Props = {
    numberOfTimeSlots: number | undefined
    onChange:(timeSlots:Array<string>)=>void
}

type State = {
    timeSlots:Array<string>;
}
export default class ReportsHeaderTimeSlots extends React.Component<Props,State> {

    constructor(props: Props){
        super(props);
        const timeSlots = new Array<string>();
        for(let i = 0; i<(this.props.numberOfTimeSlots || 0); i++) timeSlots.push("");
        this.state = {
            timeSlots:timeSlots
        } 

    }

    inputChangeHandler(event:ChangeEvent<HTMLInputElement>, index:number) {
        const timeSlots = this.state.timeSlots;
        timeSlots[index] = event.target.value;
        this.setState({timeSlots});
        this.props.onChange(timeSlots);
        
    }

    public render() {	
        return (
            <tr className="h-14 odd:bg-gray-100 even:bg-gray-300">
                <td className="font-bold pl-4">Time</td>
                {[...new Array(this.props.numberOfTimeSlots)].map( (val,i) =>
                    <td key={i} >
                        <input className="w-9/12 max-w-xs border border-black text-center" type="time" value={this.state.timeSlots[i]} onChange={(value)=>this.inputChangeHandler(value,i)}  />
                    </td>
                )}
                {this.props.numberOfTimeSlots === 1 ? <><td /><td /></> : null} 
            </tr>
        );
    }	
}