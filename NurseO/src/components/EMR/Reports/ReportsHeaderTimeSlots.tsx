import { type ChangeEvent, useEffect, useRef, useState } from 'react';

type Props = {
    numberOfTimeSlots: number | undefined
    onChange:(timeSlot: string)=>void
}

export default function ReportsHeaderTimeSlots(props:Props) {

    const timeSlotsTemp = new Array<string>();
    for(let i = 0; i<(props.numberOfTimeSlots ?? 0); i++) timeSlotsTemp.push("");
    const [timeSlots, setTmeSlots] = useState("")
    const ref = useRef<HTMLInputElement>(null)

    useEffect(()=>{
        if(ref.current) ref.current.value = ""
    },[props])
    
    const inputChangeHandler = (event:ChangeEvent<HTMLInputElement>)=>{
        const timeSlots = event.target.value;
        setTmeSlots(timeSlots)
        props.onChange(timeSlots);
        
    }

        return (
            <tr className="h-14 odd:bg-gray-100 even:bg-gray-300">
                <td className="font-bold pl-4">Time</td>
                    <td >
                        <input className="w-9/12 max-w-xs border border-black text-center"
                         type="time" value={timeSlots} 
                         onChange={inputChangeHandler}  ref={ref}/>
                    </td>
                {props.numberOfTimeSlots === 1 ? <><td /><td /></> : null} 
            </tr>
        );
    }	
