import type { ReportField } from "~/core/index";
import { Fragment, useEffect, useState } from 'react';
import ReportDynamicInput from './ReportDynamicInput';

type Props = {
    field: ReportField,
    onChange: (filedName: string, timeSlotIndex: number, value: string) => void,
    disabled: boolean,
}
export default function ReportInput(props: Props) {
    const [values, setValues] = useState(new Array<string>(props.field.labels?.length ?? 1))
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
        if (props.field.labels?.length && props.field.labels.length > 0) output = props.field.labels[inputIndex] + ": " + value
        else output = value
        values[inputIndex] = output
        setValues(values)
        onChangeUpstreamHandler(key)
    }


    const onChangeUpstreamHandler = (key: number) => {
        const fieldName = props.field.name;
        const value = values.join(" | ");
        props.onChange(fieldName, key - 1, value);
    }


    const onFreeTextChangeHandler = (value: string, key: number) => {
        const felidName = props.field.name;
        const output = "X: " + value
        props.onChange(felidName, key - 1, output);
    }

    return (
        <tr className="w-9/12 odd:bg-gray-100 even:bg-gray-300 h-14">
            <td className="font-bold pl-4 w-3/12">{props.field.name}</td>

            <Fragment>
                {/* If there are no labels show just the felid  */}
                {!props.field.labels || props.field.labels?.length === 0 ?
                    <td>
                        <ReportDynamicInput fieldType={props.field.fieldType} index={0} onChange={(v, k) => onChangeHandler(0, v, k)}
                            disabled={props.disabled} options={props.field.options} 
                        />
                    </td>

                : null}



                {/* If there are labels show the labels  */}
                {props.field.labels && props.field.labels?.length > 0 ?
                    <>
                        {props.field.labels.map((label, i) =>
                            <td key={i}>
                                <label className='block'>{label}</label>
                                <ReportDynamicInput fieldType={props.field.fieldType} index={0} onChange={(v, k) => onChangeHandler(i, v, k)}
                                    disabled={props.disabled} options={props.field.options}
                                />
                            </td>

                        )}
                    </>
                : null}




                {/* show free text when needed */}
                {showFreeTextBox ?
                    <td>
                        <ReportDynamicInput fieldType={"text"} index={0} onChange={onFreeTextChangeHandler}
                            disabled={props.disabled} options={props.field.options}
                        />
                    </td>
                    : <><td></td><td></td></>}
            </Fragment>


        </tr>

    );
}
