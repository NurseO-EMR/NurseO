import { ReportSet } from "nurse-o-core";
import { ReportInput } from "./ReportInput";

type Props = {
    reportSet: ReportSet,
    onInputChangeHandler: (filedName: string, value: string) => void,
    enabled: boolean
}

export function ReportsSubmitterTabContent(props: Props) {


    return (
        <div>
            <div className="grid grid-cols-2 gap-x-10">
                {props.reportSet.reportFields?.map((val, i) =>
                    <ReportInput
                        enabled={props.enabled}
                        onChange={(name, _, value) => props.onInputChangeHandler(name, value)}
                        key={i}
                        vital={val} />
                )}
            </div>
        </div>

    );
}
