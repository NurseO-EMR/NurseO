import React from 'react';

type Props = React.HTMLAttributes<HTMLDivElement> & {
    name: string,
    boldedKey?: boolean,
    boldedValue?: boolean,
    keyClassNames?: string,
    valueClassNames?: string,
    removeColon?: boolean
}
export default function SectionNamedInfo(props: Props) {

    return (
        <div className="text-base text-black h-3 min-w-48">
            <span className={`
                ${props.boldedKey ? "font-bold text-primary" : ""} 
                ${props.keyClassNames} 
                `
            }>
                {props.name}
                {props.removeColon ? "" : ": "}
            </span>

            <span className={`
            ${props.boldedValue ? "font-bold text-primary" : ""} 
            ${props.valueClassNames} 
            `}>{props.children}</span>
        </div>

    )
}	
