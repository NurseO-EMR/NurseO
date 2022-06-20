import { useState } from "react";
import { ReportSet } from "nurse-o-core";
import { ReportInput } from "./ReportInput";
import { ReportsHeaderTimeSlots } from "./ReportsHeaderTimeSlots";

type Props = {
    reportSet: ReportSet,
    onInputChangeHandler: (filedName: string, timeSlotIndex: number, value: string) => void,
    onTimeSlotChanges: (timeSlots: Array<string>) => void,
    numberOfTimeSlots: number
}

export function ReportsSubmitterTabContent(props: Props) {

    const [disabledTimeSlots, setDisabledTimeSlots] = useState(Array(props.numberOfTimeSlots).fill(false) as boolean[])


    const onTimeSlotChangeHandler = (timeSlots: Array<string>) => {
        const disabledTimeSlots = timeSlots.map(timeSlot => !timeSlot)
        setDisabledTimeSlots(disabledTimeSlots)
        props.onTimeSlotChanges(timeSlots);
    }

    return (
        <table className="w-full">
            <tbody>
                <ReportsHeaderTimeSlots onChange={onTimeSlotChangeHandler} numberOfTimeSlots={props.numberOfTimeSlots}></ReportsHeaderTimeSlots>
                {props.reportSet.reportFields.map((val, i) =>
                    <ReportInput
                        disabledTimeSlots={disabledTimeSlots}
                        onChange={(name, timeslotIndex, value) => props.onInputChangeHandler(name, timeslotIndex, value)}
                        key={i}
                        numberOfTimeSlots={props.numberOfTimeSlots}
                        vital={val} />
                )}

            </tbody>
        </table>
    );
}
