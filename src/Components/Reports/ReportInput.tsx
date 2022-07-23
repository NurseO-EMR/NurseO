import { Report } from 'nurse-o-core';
import { Fragment, useEffect, useState } from 'react';
import ReportDynamicInput from './ReportDynamicInput';

type Props = {
    numberOfTimeSlots: number | undefined,
    secondField?: boolean
    vital: Report,
    onChange: (filedName: string, timeSlotIndex: number, value: string) => void,
    disabledTimeSlots: boolean[],
}
export default function ReportInput(props: Props) {

    const [value1, setValue1] = useState("")
    const [value2, setValue2] = useState("")
    const [showFreeTextBox, setShowFreeTextBox] = useState(false)


    useEffect(()=>{
        setValue1("")
        setValue2("")
        setShowFreeTextBox(false)
    }, [props])

    const onChangeHandler = (inputIndex: 1 | 2 | 3, value: string, key: number) => {
        //if it has (X) as in abnormalities it will show a free text box and use that as an input 
        if(value.includes("(X)")) {
            setShowFreeTextBox(true)
            return
        } else setShowFreeTextBox(false)

        // if no (X) then either do a single and dual input methods 
        if (inputIndex === 1) {
            let output;
            if (props.vital.labels) output = props.vital.labels[0] + ": " + value
            else output = value
            setValue1(output)
            onChangeUpstreamHandler(output, value2, key)
        }
        if (inputIndex === 2) {
            let output;
            if (props.vital.labels) output = props.vital.labels[1] + ": " + value
            else output = value
            setValue2(output)
            onChangeUpstreamHandler(value1, output, key)
        }

    }


    const onChangeUpstreamHandler = (v1: string, v2: string, key: number) => {
        const vitalName = props.vital.name;
        let value;
        if (v2) value = `${v1} | ${v2}`
        else value = v1
        console.log(value)
        props.onChange(vitalName, key - 1, value);
    }


    const onFreeTextChangeHandler = (value:string, key: number) => {
        const vitalName = props.vital.name;
        const output = "X: " + value
        props.onChange(vitalName, key - 1, output);
    }

    if (props.numberOfTimeSlots === undefined) return null;

    return (
        <tr className="w-9/12 odd:bg-gray-100 even:bg-gray-300 h-14">
            {[...new Array(props.numberOfTimeSlots + 1)].map((_, i) => {
                if (i === 0) return <td key={i} className="font-bold pl-4 w-3/12">{props.vital.name}</td>
                else {
                    const disabled = props.disabledTimeSlots[i - 1];
                    return <Fragment key={i}>
                        <td>
                            {props.vital.labels ? <label className='block'>{props.vital.labels[0]}</label> : null}
                            <ReportDynamicInput fieldType={props.vital.fieldType} index={i} onChange={(v, k) => onChangeHandler(1, v, k)}
                                disabled={disabled} options={props.vital.VitalsOptions}
                            />
                        </td>

                        {/* This adds a clone of the felid */}
                        {props.secondField ?
                            <td>
                                {props.vital.labels && props.vital.labels.length > 1 ? <label className='block'>{props.vital.labels[1]}</label> : null}

                                <ReportDynamicInput fieldType={props.vital.fieldType} index={i} onChange={(v, k) => onChangeHandler(2, v, k)}
                                    disabled={disabled} options={props.vital.VitalsOptions}
                                />
                            </td>
                            : <td></td>
                        }

                        {showFreeTextBox ?
                            <td>
                                <ReportDynamicInput fieldType={"text"} index={i} onChange={onFreeTextChangeHandler}
                                    disabled={disabled} options={props.vital.VitalsOptions}
                                />
                            </td>
                            : <td></td>}
                    </Fragment>
                }
            })}

        </tr>

    );
}
