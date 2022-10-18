import { useEffect, useState } from 'react';
import { MedicationOrder, Time, MedicationOrderSyntax, Medication } from 'nurse-o-core';
import { Database } from '../../Services/Database';
import { MedLocationModal } from './MedLocationModal';

type Props = {
    order: MedicationOrder,
    timeSlots: number[],
    simTime: Time,
    onLocateClick: (med: Medication) => void
}


type TimeSlotStatus = string | "Available" | "-" | "Due"
export function MarEntry(props: Props) {

    const [timeSlots, setTimeSlots] = useState(new Map<number, TimeSlotStatus>())
    const [med, setMed] = useState<Medication>({id: "", locations: [], narcoticCountNeeded: false,})
    const [showLocationModal, setShowLocationModal] = useState(false)

    useEffect(() => {
        function fillTimeSlots() {
            for (const timeSlot of props.timeSlots) {
                timeSlots.set(timeSlot, "-")
            }
            return timeSlots
        }

        function checkForRecordedMarData() {
            for (const recordTime of props.order.mar) {
                const { hour, minutes } = recordTime;
                timeSlots.set(hour, `${hour.toString().padStart(2,"0")}:${minutes.toString().padStart(2,"0")}`);                
            }
        }

        async function getMed() {
            const db = Database.getInstance();
            const med = await db.getMedication(props.order.id);
            if(med) setMed(med)
        }



        fillTimeSlots();
        checkForRecordedMarData();
        setTimeSlots(timeSlots)
        getMed()
        // eslint-disable-next-line no-use-before-define
    }, [timeSlots, setTimeSlots, props.order, props.timeSlots, props.simTime.hour])


    const isMedGivin = (status:TimeSlotStatus) => {
        return status!=="Available" && status!=="-" && status !== "Due"
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
            <tr className="odd:bg-gray-100 even:bg-gray-300 h-32">
                <td className="w-80 pl-16 font-semibold">
                    <MedicationOrderSyntax med={med} order={props.order} />
                </td>
                {props.timeSlots.map((hour, i) => {
                    return <td className='font-bold text-center'
                        key={i}>{
                            getTimeSlotValue(hour)
                        } </td>
                }
                )}
                <td className='w-36'>
                    <button className='bg-red-700 w-full h-32 text-white'
                        onClick={() => setShowLocationModal(true)}>Locate</button>
                </td>
            </tr>
            {showLocationModal && med ?
                <MedLocationModal onClose={()=>setShowLocationModal(false)} med={med} />
                : null}
        </>
    );
}
