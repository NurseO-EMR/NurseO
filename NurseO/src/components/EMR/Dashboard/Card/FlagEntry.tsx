import React from 'react';
import { TableCell, TableRow } from '~/components/common/ui/table';
import type { Flag } from '~/core/index';


export type Props = {
    flag: Flag
}
export default class FlagEntry extends React.Component<Props> {

    public render() {
        return (
            <TableRow>
                <TableCell className="border-2 p-2 border-trueGray-200">{this.props.flag.name}</TableCell>
                <TableCell className="border-2 p-2 border-trueGray-200">{this.props.flag.reason}</TableCell>
            </TableRow>
        );
    }
}