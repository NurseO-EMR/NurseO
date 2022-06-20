import { Report } from "nurse-o-core";
import {ReportDynamicInput} from "./ReportDynamicInput";

type Props = {
    numberOfTimeSlots: number | undefined,
    vital: Report,
    onChange: (filedName: string, timeSlotIndex: number, value: string) => void,
    disabledTimeSlots: boolean[],
}
export function ReportInput(props: Props) {

    const onChangeHandler = (value: string, key: number) => {
        const vitalName = props.vital.name;
        props.onChange(vitalName, key - 1, value);
    }

    if (props.numberOfTimeSlots === undefined) return null;

    return (
        <tr className="w-9/12 odd:bg-gray-100 even:bg-gray-300 h-14">
            {[...new Array(props.numberOfTimeSlots + 1)].map((_, i) => {
                if (i === 0) return <td key={i} className="font-bold pl-4 w-3/12">{props.vital.name}</td>
                else {
                    const disabled = props.disabledTimeSlots[i - 1];
                    return <td key={i}>

                        <ReportDynamicInput fieldType={props.vital.fieldType} index={i} onChange={onChangeHandler}
                            disabled={disabled} options={props.vital.VitalsOptions}
                        />
                    </td>
                }
            })}

        </tr>

    );
}
