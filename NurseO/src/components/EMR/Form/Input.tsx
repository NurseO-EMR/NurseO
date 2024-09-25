import React, { useId } from 'react';
import LabelInputWrapper from './LabelInputWrapper';


type Props = React.HTMLProps<HTMLInputElement> & {
    notRequired?: boolean
    admin?: boolean
};
export default function Input(props: Props) {
    const id = useId()
    return (
        <LabelInputWrapper className={props.className}>
            <label htmlFor={id}>{props.children}</label>
            <input onChange={props.onChange} className={`border-2 rounded-full ml-6 text-center col-span-3 h-9 border-${props.admin ? "admin" : "primary"}`}
                id={id} type={props.type} value={props.value} required={!props.notRequired}
                list={props.list}
                autoComplete={props.autoComplete}
            />
        </LabelInputWrapper>
    );
}	
