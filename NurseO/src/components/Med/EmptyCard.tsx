import { type HTMLAttributes } from 'react';


type Props = HTMLAttributes<HTMLDivElement> & {
    title?: string,
    className?: string
}

export function EmptyCard(props:Props) {

        return (

            <div className={`${props.className}`}>
                <div className={`border-4 border-primary mt-4 mx-3 pb-2 shadow rounded-xl`}>
                    <h1 className={`w-full bg-primary text-white p-4 font-bold`}>{props.title}</h1>
                    {props.children}
                </div>
            </div>
        );
    }
