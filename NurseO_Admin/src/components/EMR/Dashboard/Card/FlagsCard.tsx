import React from 'react';
import { type Flag } from '@nurse-o-core/index';
import Card from './Card';
import FlagEntry from './FlagEntry';

type Props = React.HTMLAttributes<HTMLDivElement> & {
    flags: Flag[]
}

export default function FlagsCard(props: Props) {

    return (
        <Card className={props.className} title="Flags">
            <thead className="font-bold">
                <tr>
                    <td className="border-2 p-2 border-trueGray-200">Flag</td>
                    <td className="border-2 p-2 border-trueGray-200">Reason</td>
                </tr>
            </thead>
            <tbody>
                {props.flags?.length === 0 ?
                    <tr><td colSpan={2} className='text-center p-2 border-trueGray-200'><h1>No flags found</h1></td></tr> :
                    props.flags.map((flag, i) => <FlagEntry key={i} flag={flag}></FlagEntry>)
                }
            </tbody>
        </Card>

    );
}
