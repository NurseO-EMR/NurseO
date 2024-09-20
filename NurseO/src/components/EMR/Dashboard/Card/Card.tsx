import React from 'react';
import EmptyCard from './EmptyCard';


type Props = React.HTMLAttributes<HTMLDivElement> & {
    title: string,
    editable?: boolean,
    onEditClick?: () => void
}
export default function Card(props: Props) {

    return (
        <EmptyCard title={props.title} className={props.className} editable={props.editable} onEditClick={props.onEditClick}>
            <table className="w-full ">
                {props.children}
            </table>
        </EmptyCard>
    );
}	
