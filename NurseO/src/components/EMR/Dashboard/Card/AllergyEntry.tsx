import React from 'react';
import { TableCell, TableRow } from '~/components/common/ui/table';
import { type Allergy } from '~/core/index';


export type Props = {
    allergy: Allergy
}
export default class AllergyEntry extends React.Component<Props> {

    public render() {
        return (
            <TableRow>
                <TableCell className="border-2 p-2 border-trueGray-200">{this.props.allergy.name}</TableCell>
                <TableCell className="border-2 p-2 border-trueGray-200">{this.props.allergy.reaction}</TableCell>
            </TableRow>
        );
    }
}