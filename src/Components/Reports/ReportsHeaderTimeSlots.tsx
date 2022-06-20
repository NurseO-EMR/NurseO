import { ChangeEvent, useState } from "react";

type Props = {
    numberOfTimeSlots: number | undefined
    onChange: (timeSlots: Array<string>) => void
}

export function ReportsHeaderTimeSlots(props: Props) {

    const [timeSlots, setTimeSlots] = useState(Array(props.numberOfTimeSlots).fill("") as string[])


    const inputChangeHandler = (event: ChangeEvent<HTMLInputElement>, index: number) => {
        timeSlots[index] = event.target.value;
        setTimeSlots(timeSlots)
        props.onChange(timeSlots);

    }

    return (
        <tr className="h-14 odd:bg-gray-100 even:bg-gray-300">
            <td className="font-bold pl-4">Time</td>
            {[...new Array(props.numberOfTimeSlots)].map((val, i) =>
                <td key={i} >
                    <input className="w-9/12 max-w-xs border border-black text-center" type="time" value={timeSlots[i]}
                     onChange={(value) => inputChangeHandler(value, i)} />
                </td>
            )}
        </tr>
    );
}	
