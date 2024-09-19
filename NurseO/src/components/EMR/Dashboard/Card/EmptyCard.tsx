import React from 'react';


type Props = React.HTMLAttributes<HTMLDivElement> & {
    title: string
}

export default function EmptyCard(props:Props) {

        return (
            <div className={props.className}>
                <div className={`border-4 border-primary mt-4 rounded-lg mx-3 pb-2`}>
                    <h1 className={`w-full bg-primary text-white p-4 font-bold`}>{props.title}</h1>
                    {props.children}
                </div>
            </div>
        );
    }
