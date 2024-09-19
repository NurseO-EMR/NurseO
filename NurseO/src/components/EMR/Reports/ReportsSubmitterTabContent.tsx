import React, { useState } from 'react';
import type { ReportSet } from "~/core/index";
import ReportInput from './ReportInput';
import ReportsHeaderTimeSlots from './ReportsHeaderTimeSlots';
import Image from "next/image"

type Props = {
    reportSet: ReportSet,
    onInputChangeHandler: (filedName: string, timeSlotIndex: number, value: string) => void,
    onTimeSlotChanges: (timeSlots: string) => void,
    numberOfTimeSlots: number
}

export default function ReportsSubmitterTabContent(props:Props) {

    const [disabled, setDisabled] = useState(true)


    const onTimeSlotChangeHandler = (timeSlots: string) => {
        setDisabled(false)
        props.onTimeSlotChanges(timeSlots);
    }

    return (
        <>
            {props.reportSet.image && props.reportSet.imageAlt ?
                <Image src={props.reportSet.image} alt={props.reportSet.imageAlt} width={662} height={256} className='max-h-64 m-auto' />
                : null}
            <table className="w-full">
                <tbody>
                    <ReportsHeaderTimeSlots onChange={onTimeSlotChangeHandler} numberOfTimeSlots={props.numberOfTimeSlots}></ReportsHeaderTimeSlots>
                    {props.reportSet.reportFields.map((field, i) =>
                        <ReportInput
                            onChange={(name, timeslotIndex, value) => props.onInputChangeHandler(name, timeslotIndex, value)}
                            key={i}
                            disabled={disabled}
                            field={field} />
                    )}
                </tbody>
            </table>
        </>
    );
}
