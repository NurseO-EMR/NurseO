import React, { useId } from 'react';

type Props = {
    label: string,
    onChange?: React.ChangeEventHandler<HTMLTextAreaElement>
    vertical?: boolean
    value?: string
}

export default function TextArea(props: Props) {
    const id = useId()
    return (

        <div>
            <label htmlFor={id} className={`text-primary text-xl font-bold`}>{props.label}</label>
            <textarea className={`w-full border-2 border-primary p-4 mt-4 rounded-xl`} rows={5} value={props.value}
                spellCheck="true" id={id}
                onChange={props.onChange}></textarea>
        </div>
    );
}	