import React, { useId } from 'react';

type Props = React.HTMLProps<HTMLInputElement> & {
    notRequired?: boolean
    admin?: boolean
};
export default function VerticalInput(props: Props) {
    const id = useId()
    return (
        <div className='my-4'>
            <label htmlFor={id} className='font-bold'>{props.children}</label><br />
            <input onChange={props.onChange} className={`border-2 rounded-md w-full col-span-3 h-9 mt-2 text-left pl-4`}
                id={id} type={props.type} value={props.value} required={!props.notRequired}
                list={props.list}
                autoComplete={props.autoComplete}
            />
        </div>
    );
}	
