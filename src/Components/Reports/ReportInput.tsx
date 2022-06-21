import { Report } from "nurse-o-core";
import { ReportDynamicInput } from "./ReportDynamicInput";

type Props = {
    vital: Report,
    onChange: (filedName: string, timeSlotIndex: number, value: string) => void,
    enabled: boolean,
}
export function ReportInput(props: Props) {

    const onChangeHandler = (value: string, key: number) => {
        const vitalName = props.vital.name;
        props.onChange(vitalName, key - 1, value);
    }
    return (
        <ReportDynamicInput fieldType={props.vital.fieldType} index={0} onChange={onChangeHandler}
            enabled={props.enabled} options={props.vital.VitalsOptions} label={props.vital.name}
        />
    );
}
