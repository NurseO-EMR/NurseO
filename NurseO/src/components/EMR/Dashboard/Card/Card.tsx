import React, { type ReactElement } from 'react';
import EmptyCard from './EmptyCard';
import { Table } from '~/components/common/ui/table';


type Props = React.HTMLAttributes<HTMLDivElement> & {
    title: string,
    editable?: boolean,
    onEditClick?: () => void,
    previewEle?: ReactElement | string
}
export default function Card(props: Props) {

    return (
        <EmptyCard title={props.title} className={props.className} editable={props.editable} onEditClick={props.onEditClick}>
            <Table className="w-full ">
                {props.children}
            </Table>
        </EmptyCard>

    );
}	
