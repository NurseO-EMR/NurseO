import type { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';

type Props = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

export function Button(props: Props) {
    const { className, children, ...buttonProps } = props

    return (
        <button onClick={props.onClick}
            className={`text-white rounded-full px-8 py-2
             text-center cursor-pointer ${props.className}`}
            {...buttonProps}
        >{props.children}</button>

    );
}