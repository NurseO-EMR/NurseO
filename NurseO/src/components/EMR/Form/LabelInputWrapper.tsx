import React, { type ReactElement } from 'react';

type Props = {
    className?: string,
    children: ReactElement | ReactElement[]
    vertical?: boolean
}

export default function LabelInputWrapper(props: Props) {

    if (props.vertical) {
        return (
            <div className={`font-bold grid gap-4 ${props.className}`}>
                {props.children}
            </div>
        )
    }

    return (
        <div className={`grid grid-cols-4 w-11/12 my-2 items-center font-bold ${props.className}`}>
            {props.children}
        </div>

    );
}