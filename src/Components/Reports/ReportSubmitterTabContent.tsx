import { ReportSet } from "nurse-o-core";
import { ReportInput } from "./ReportInput";

type Props = {
    reportSet: ReportSet,
    onInputChangeHandler: (filedName: string, timeSlotIndex: number, value: string) => void,
    enabled: boolean
}

export function ReportsSubmitterTabContent(props: Props) {


    return (
        <div>
            <div className="flex flex-wrap gap-2">
                {props.reportSet.reportFields.map((val, i) =>
                    <ReportInput
                        enabled={props.enabled}
                        onChange={(name, timeslotIndex, value) => props.onInputChangeHandler(name, timeslotIndex, value)}
                        key={i}
                        vital={val} />
                )}
            </div>
        </div>

    );
}
