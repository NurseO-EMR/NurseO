import React from 'react';
import { Flag } from 'nurse-o-core';


export type Props = {
    flag: Flag
}
export default class FlagEntry extends React.Component<Props> {

    public render() {
        return (
            <tr>
                <td className="border-2 p-2">{this.props.flag.name}</td>
                <td className="border-2 p-2">{this.props.flag.reason}</td>
            </tr>
        );
    }
}