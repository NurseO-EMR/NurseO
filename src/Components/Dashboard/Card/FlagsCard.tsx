import React from 'react';
import { Flag } from '../../../Types/PatientProfile';
import Card from './Card';
import FlagEntry from './FlagEntry';

type Props = React.HTMLAttributes<HTMLDivElement> & {
    flags: Flag[] | undefined,
    preview?: boolean
}

export default class FlagsCard extends React.Component<Props> {

    public render() {
        return (
            <Card className={this.props.className} title="Flags" admin={this.props.preview}>
            <thead className="font-bold">
                <tr>
                    <td className="border-2 p-2">Flag</td>
                    <td className="border-2 p-2">Reason</td>
                </tr>
            </thead>
            <tbody>
                {this.props.flags?.length === 0 ? 
                    <tr><td colSpan={2} className='text-center p-2'><h1>No flags found</h1></td></tr>:
                    this.props.flags!.map((flag,i) => <FlagEntry key={i} flag={flag}></FlagEntry>)
                }
            </tbody>
        </Card>

        );
    }
}