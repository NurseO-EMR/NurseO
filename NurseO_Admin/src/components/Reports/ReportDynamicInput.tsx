import React, { ChangeEvent, useEffect, useState } from "react";
import { ReportInputType, ReportOptions } from "@nurse-o-core/index";
import { Input } from "../Form/Input";
import { Select } from "../Form/Select";

type Props = {
    fieldType: ReportInputType,
    index: number,
    onChange: (value: string, key: number) => void,
    enabled: boolean,
    options?: ReportOptions,
    label: string

}

export function ReportDynamicInput(props: Props) {
    const inputStyle = "disabled:bg-gray-300 disabled:cursor-not-allowed";
    const checkBoxChecked = new Set<string>();
    const [value, setValue] = useState("")

    useEffect(()=>{
        setValue("")
    }, [props.label])

    const onInputChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const key: number = Number.parseInt(event.target.name);
        const value = event.target.value;
        setValue(value)
        props.onChange(value, key);
    }

    const onSelectChangeHandler = (event: ChangeEvent<HTMLSelectElement>) => {
        const key: number = Number.parseInt(event.target.name);
        const value = event.target.value;
        setValue(value)
        props.onChange(value, key);
    }

    const onCheckBoxChecked = (value: string, checked: boolean, key: number) => {
        if (checked) {
            checkBoxChecked.add(value);
        } else {
            checkBoxChecked.delete(value);
        }

        const output = [...checkBoxChecked].toString().replaceAll(",", ", ")
        props.onChange(output, key);
    }


    return (
        <>
            {props.fieldType === "text" ?
                <Input label={props.label} name={props.index.toString()} onChange={onInputChangeHandler} className={inputStyle + " "} optional={true}
                    type="text" disabled={!props.enabled} value={value} /> : null}


            {props.fieldType === "number" ?
                <Input label={props.label} name={props.index.toString()} onChange={onInputChangeHandler} className={inputStyle} optional={true}
                    type="number" disabled={!props.enabled} value={value} /> : null}


            {props.fieldType === "T/F" ?
                <Select name={props.index.toString()} onChange={onSelectChangeHandler} className={inputStyle} optional={true}
                    disabled={!props.enabled} label={props.label} value={value} >
                    <option></option>
                    <option>Y</option>
                    <option>N</option>
                </Select> : null}


            {props.fieldType === "checkbox" ?
                <div className="my-4 w-full text-center">
                    <label className="font-bold">{props.label}</label>
                    <div className="flex flex-wrap gap-5 w-[90%] m-auto justify-center">
                        {props.options?.map((val, j) =>
                            <div key={props.index + j} className="flex items-center gap-2" >
                                <input type="checkbox" disabled={!props.enabled} onChange={e => onCheckBoxChecked(val.name, e.target.checked, props.index)} />
                                <label>{val.name}</label>
                            </div>
                        )}
                    </div>
                </div>
                : null}



            {props.fieldType === "options" ?
                <Select name={props.index.toString()} onChange={onSelectChangeHandler} 
                className={inputStyle} disabled={!props.enabled} 
                label={props.label} optional={true} value={value} >
                    <option></option>
                    <>
                        {props.options?.map((val, i) => <option key={i} title={val.name}>{val.name}</option>)}
                    </>
                </Select>
                : null}
        </>

    );
}