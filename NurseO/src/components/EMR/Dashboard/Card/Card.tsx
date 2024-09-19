import React from 'react';
import EmptyCard from './EmptyCard';


type Props = React.HTMLAttributes<HTMLDivElement> & {
    title: string,
}
export default function Card(props: Props) {

    return (
        <EmptyCard title={props.title} className={props.className}>
            <table className="w-full ">
                {props.children}
            </table>
        </EmptyCard>
    );
}	
