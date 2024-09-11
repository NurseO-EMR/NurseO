import React from 'react';
import type { Flag } from '@nurse-o-core/index';


export type Props = {
    flag: Flag
}
export default class FlagEntry extends React.Component<Props> {

    public render() {
        return (
            <tr>
                <td className="border-2 p-2 border-trueGray-200">{this.props.flag.name}</td>
                <td className="border-2 p-2 border-trueGray-200">{this.props.flag.reason}</td>
            </tr>
        );
    }
}