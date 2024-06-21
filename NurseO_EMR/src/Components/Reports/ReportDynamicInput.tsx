import { type ChangeEvent, useEffect, useRef, useState } from 'react';
import type { ReportInputType } from "@nurse-o-core/index";

type Props = {
    fieldType: ReportInputType,
    index: number,
    onChange: (value: string, key: number) => void,
    disabled?: boolean,
    options?: string[]
}

export default function ReportDynamicInput(props: Props) {
    const inputStyle = "w-9/12 max-w-xs border border-black disabled:bg-gray-300 disabled:cursor-not-allowed";
    const [checkBoxChecked, setCheckBoxChecked] = useState(new Set<string>())
    const inputRef = useRef<HTMLInputElement>(null)
    const selectRef = useRef<HTMLSelectElement>(null)

    useEffect(()=>{
        if(inputRef.current) inputRef.current.value = ""
        if(selectRef.current) selectRef.current.value = ""
    },[props])

    const onInputChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const key: number = Number.parseInt(event.target.name);
        const value = event.target.value;
        props.onChange(value, key);
    }

    const onSelectChangeHandler = (event: ChangeEvent<HTMLSelectElement>) => {
        const key: number = Number.parseInt(event.target.name);
        const value = event.target.value;
        props.onChange(value, key);
    }

    const onCheckBoxChecked = (value: string, checked: boolean, key: number) => {
        if (checked) {
            checkBoxChecked.add(value);
        } else {
            checkBoxChecked.delete(value);
        }
        setCheckBoxChecked(checkBoxChecked)
        const output = [...checkBoxChecked].toString().replaceAll(",", ", ")
        props.onChange(output, key);
    }


    return (
        <>
            {props.fieldType === "text" ?
                <input name={props.index.toString()} onChange={onInputChangeHandler} className={inputStyle + " "}
                    type="text" disabled={props.disabled} ref={inputRef} /> : null}


            {props.fieldType === "number" ?
                <input name={props.index.toString()} onChange={onInputChangeHandler} className={inputStyle}
                    type="number" disabled={props.disabled} ref={inputRef}/> : null}


            {props.fieldType === "T/F" ?
                <select name={props.index.toString()} onChange={onSelectChangeHandler} className={inputStyle}
                    disabled={props.disabled} ref={selectRef}>
                    <option></option>
                    <option>Y</option>
                    <option>N</option>
                </select> : null}


            {props.fieldType === "checkbox" ?
                <div className="flex flex-wrap gap-5 w-1/2">
                    {props.options?.map((val, j) =>
                        <div key={props.index + j} className="flex items-center gap-2" >
                            <input type="checkbox" ref={inputRef} disabled={props.disabled} onChange={e => onCheckBoxChecked(val, e.target.checked, props.index)} />
                            <label>{val}</label>
                        </div>
                    )}
                </div>
                : null}



            {props.fieldType === "options" ?
                <select name={props.index.toString()} onChange={onSelectChangeHandler} 
                className={inputStyle} disabled={props.disabled} ref={selectRef}>
                    <option></option>
                    {props.options?.map((val, i) => <option key={i} title={val}>{val}</option>)}
                </select>
                : null}
        </>

    );
}
