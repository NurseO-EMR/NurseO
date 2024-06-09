import { Report } from "@nurse-o-core/index";
import { Fragment, useEffect, useState } from 'react';
import ReportDynamicInput from './ReportDynamicInput';

type Props = {
    vital: Report,
    onChange: (filedName: string, timeSlotIndex: number, value: string) => void,
    disabled: boolean,
}
export default function ReportInput(props: Props) {
    const [values, setValues] = useState(new Array<string>(props.vital.labels?.length || 1))
    const [showFreeTextBox, setShowFreeTextBox] = useState(false)


    useEffect(() => {
        setShowFreeTextBox(false);
    }, [props])


    const onChangeHandler = (inputIndex: number, value: string, key: number) => {
        //if it has (X) as in abnormalities it will show a free text box and use that as an input 
        if (value.includes("(X)")) {
            setShowFreeTextBox(true)
            return
        } else setShowFreeTextBox(false)

        // if no (X) then either do a single and multi input methods 
        let output;
        if (props.vital.labels) output = props.vital.labels[inputIndex] + ": " + value
        else output = value
        values[inputIndex] = output
        setValues(values)
        onChangeUpstreamHandler(key)
    }


    const onChangeUpstreamHandler = (key: number) => {
        const vitalName = props.vital.name;
        let value = values.join(" | ");
        console.log(value)
        props.onChange(vitalName, key - 1, value);
    }


    const onFreeTextChangeHandler = (value: string, key: number) => {
        const vitalName = props.vital.name;
        const output = "X: " + value
        props.onChange(vitalName, key - 1, output);
    }

    return (
        <tr className="w-9/12 odd:bg-gray-100 even:bg-gray-300 h-14">
            <td className="font-bold pl-4 w-3/12">{props.vital.name}</td>

            <Fragment>
                {/* If there are no labels show just the felid  */}
                {!props.vital.labels || props.vital.labels?.length === 0 ?
                    <td>
                        <ReportDynamicInput fieldType={props.vital.fieldType} index={0} onChange={(v, k) => onChangeHandler(0, v, k)}
                            disabled={props.disabled} options={props.vital.VitalsOptions}
                        />
                    </td>

                : null}



                {/* If there are labels show the labels  */}
                {props.vital.labels && props.vital.labels?.length > 0 ?
                    <>
                        {props.vital.labels.map((label, i) =>
                            <td key={i}>
                                <label className='block'>{label}</label>
                                <ReportDynamicInput fieldType={props.vital.fieldType} index={0} onChange={(v, k) => onChangeHandler(i, v, k)}
                                    disabled={props.disabled} options={props.vital.VitalsOptions}
                                />
                            </td>

                        )}
                    </>
                : null}




                {/* show free text when needed */}
                {showFreeTextBox ?
                    <td>
                        <ReportDynamicInput fieldType={"text"} index={0} onChange={onFreeTextChangeHandler}
                            disabled={props.disabled} options={props.vital.VitalsOptions}
                        />
                    </td>
                    : <><td></td><td></td></>}
            </Fragment>


        </tr>

    );
}
