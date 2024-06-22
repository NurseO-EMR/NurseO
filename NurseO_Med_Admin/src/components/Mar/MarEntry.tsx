import { useEffect, useState } from 'react';
import {type MedicationOrder, type Time, type Medication, MedicationOrderSyntax } from '@nurse-o-core/index';
import { MedLocationModal } from './MedLocationModal';

type Props = {
    order: MedicationOrder,
    timeSlots: number[],
    simTime: Time,
    onLocateClick: (med: Medication) => void
}


type TimeSlotStatus = JSX.Element | "-" 
export function MarEntry(props: Props) {

    const [timeSlots, setTimeSlots] = useState(new Map<number, TimeSlotStatus>())
    const [showLocationModal, setShowLocationModal] = useState(false)

    useEffect(() => {
        function fillTimeSlots() {
            for (const timeSlot of props.timeSlots) {
                timeSlots.set(timeSlot, "-")
            }
            return timeSlots
        }

        function checkForRecordedMarData() {
            for (const record of props.order.mar) {
                const { hour, minute, dose } = record;
                timeSlots.set(hour, <span>{hour.toString().padStart(2,"0")}:{minute.toString().padStart(2,"0")} <br /> {dose} </span>)      
            }
        }


        fillTimeSlots();
        checkForRecordedMarData();
        setTimeSlots(timeSlots)
        // eslint-disable-next-line no-use-before-define
    }, [timeSlots, setTimeSlots, props.order, props.timeSlots, props.simTime.hour])


    const isMedGivin = (status:TimeSlotStatus) => {
        return status!=="-" 
    }

    const getTimeSlotValue = (hour:number)=>{
        const value =  timeSlots.get(hour);
        if(!value) return <span>Error</span>
        if(isMedGivin(value)) {
            return <span>{value} <br /> - LK</span>
        } else {
            return <span>{value}</span>
        }

    }


    return (
        <>
            <tr className={`odd:bg-gray-100 even:bg-gray-300 h-32 relative
            ${props.order.completed ? `
            after:bg-green-700 after:opacity-30 after:h-full after:w-[calc(100%-9rem)] 
            after:absolute after:inset-0 after:border-2 after:content-['Completed'] after:text-center 
            after:items-center after:grid after:font-bold after:text-5xl after:z-10` : null}
            `}>
                <td className={`w-80 pl-16 font-semibold ${props.order.completed ? "line-through" : null}`}>
                    <MedicationOrderSyntax order={props.order} />
                </td>
                {props.timeSlots.map((hour, i) => {
                    if(hour === props.simTime.hour && !props.order.completed) {
                        return <td className="font-bold text-center bg-primary/20" key={i}>{getTimeSlotValue(hour)}</td>
                    } else {
                        return <td className="font-bold text-center" key={i}>{getTimeSlotValue(hour)}</td>
                    }
                    
                }
                )}
                <td className='w-36'>
                    <button className='bg-primary w-full h-32 text-white'
                        onClick={() => setShowLocationModal(true)}>Locate</button>
                </td>
            </tr>
            {showLocationModal ?
                <MedLocationModal onClose={()=>setShowLocationModal(false)} order={props.order}/>
                : null}
        </>
    );
}
