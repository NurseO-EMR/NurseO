import { useEffect, useState } from 'react';
import { Frequency, MedicationOrder, Routine, Time, MedicationOrderSyntax, OrderType, Medication } from 'nurse-o-core';
import { clone } from "lodash";
import { Database } from '../../Services/Database';
import { MedLocationModal } from './MedLocationModal';
import {$providerOrdersAvailable} from "./../../Services/State"

type Props = {
    order: MedicationOrder,
    timeSlots: number[],
    simTime: Time,
    onLocateClick: (med: Medication) => void
}


type TimeSlotStatus = string | "Available" | "-" | "Due"
export function MarEntry(props: Props) {

    const [timeSlots, setTimeSlots] = useState(new Map<number, TimeSlotStatus>())
    const [med, setMed] = useState<Medication | null>(null)
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

        function getLastDoseTime() {
            let lastDoseTime = -1;
            timeSlots.forEach((v, k) => {
                if (isMedGivin(v) && k > lastDoseTime) {
                    lastDoseTime = k
                }
            })

            return lastDoseTime;

        }


        function checkRoutineConditions() {
            const routine = props.order.routine;
            //check if the there is provider order with mar data, then show the mar data but no routine. 
            if (!$providerOrdersAvailable.value && props.order.orderType === OrderType.provider) return;

            if (routine === Routine.NOW) {
                const currentState = timeSlots.get(props.simTime.hour);
                if (currentState === "-") {
                    timeSlots.set(props.simTime.hour, "Due");
                }
            } else if (routine === Routine.PRN || routine === Routine.Scheduled) {
                const interval = getMedQInterval(props.order) || 1;
                const lastDoseTime = getLastDoseTime();
                const start = lastDoseTime > -1 ? lastDoseTime : props.simTime.hour
                for (let i = start; i <= Math.max(...props.timeSlots); i = interval + i) {
                    const time: Time = { hour: i, minutes: 0 }

                    if (timeSlots.get(time.hour) !== "Givin") {
                        if (routine === Routine.PRN) timeSlots.set(time.hour, "Available")
                        else if (routine === Routine.Scheduled) timeSlots.set(time.hour, "Due")
                    }
                }
            }
        }

        async function getMed() {
            const db = Database.getInstance();
            const med = await db.getMedication(props.order.id);
            setMed(med)
        }



        fillTimeSlots();
        checkForRecordedMarData();
        checkRoutineConditions();
        setTimeSlots(timeSlots)
        getMed()
        // eslint-disable-next-line no-use-before-define
    }, [timeSlots, setTimeSlots, props.order, props.timeSlots, props.simTime.hour])


    const getMedQInterval = (order: MedicationOrder) => {
        switch (order.frequency) {
            case Frequency.q1hr: return 1;
            case Frequency.q2hr: return 2;
            case Frequency.q3hr: return 3;
            case Frequency.q4hr: return 4;
            case Frequency.q5hr: return 5;
            case Frequency.q6hr: return 6;
            case Frequency.q7hr: return 7;
            case Frequency.q8hr: return 8;
            case Frequency.q9hr: return 9;
            case Frequency.q10hr: return 10;
            case Frequency.q11hr: return 11;
            case Frequency.q12hr: return 12;
            default: return null

        }

    }


    const getOrder = () => {
        const order = clone(props.order);
        if (!$providerOrdersAvailable.value && order.orderType === OrderType.provider) {
            order.routine = Routine.NA
            order.frequency = Frequency.NA
            order.concentration = ""
            return order
        } else return order;
    }

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
                    <MedicationOrderSyntax medName={med ? med.name : "Loading..."} order={getOrder()} />
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
