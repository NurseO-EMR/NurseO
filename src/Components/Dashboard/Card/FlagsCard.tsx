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
            <Card className={this.props.className} title="Flags" preview={this.props.preview}>
            <thead className="font-bold">
                <tr>
                    <td className="border-2 p-2">Flag</td>
                    <td className="border-2 p-2">Reason</td>
                </tr>
            </thead>
            <tbody>
                {this.props.flags ? 
                    this.props.flags.map((flag,i) => <FlagEntry key={i} flag={flag}></FlagEntry>): 
                    <tr><td><h1>No flags added</h1></td></tr>
                }
            </tbody>
        </Card>

        );
    }
}