import React from 'react';
import { type Flag } from '~/core/index';
import Card from './Card';
import FlagEntry from './FlagEntry';
import { TableCell, TableHead, TableHeader, TableRow } from '~/components/common/ui/table';

type Props = React.HTMLAttributes<HTMLDivElement> & {
    flags: Flag[]
}

export default function FlagsCard(props: Props) {

    return (
        <Card className={props.className} title="Flags">
            <TableHeader className="font-bold">
                <TableRow>
                    <TableHead className="border-2 p-2 border-trueGray-200">Flag</TableHead>
                    <TableHead className="border-2 p-2 border-trueGray-200">Reason</TableHead>
                </TableRow>
            </TableHeader>
            <tbody>
                {props.flags?.length === 0 ?
                    <TableRow><TableCell colSpan={2} className='text-center p-2 border-trueGray-200'><h1>No flags found</h1></TableCell></TableRow> :
                    props.flags.map((flag, i) => <FlagEntry key={i} flag={flag}></FlagEntry>)
                }
            </tbody>
        </Card>

    );
}
