import React from 'react';
import Card from './Card';
import { TableCell, TableHead, TableHeader, TableRow } from '~/components/common/ui/table';

type Props = React.HTMLAttributes<HTMLDivElement> & {
    history: string[],
}
export default class SocialHistoryCard extends React.Component<Props> {

    public render() {
        return (
            <Card className={this.props.className} title="Social History">
                <TableHeader className="font-bold">
                    <TableRow>
                        <TableHead className="border-2 p-2 border-trueGray-200">Entry</TableHead>
                    </TableRow>
                </TableHeader>
                <tbody>
                    {this.props.history?.length === 0 ?
                        <tr><td colSpan={2} className='text-center p-2'><span>No records found</span></td></tr> :
                        this.props.history.map((history, i) =>
                            <TableRow key={i}>
                                <TableCell className="border-2 p-2 border-trueGray-200">{history}</TableCell>
                            </TableRow>)
                    }
                </tbody>
            </Card>
        )

    }
}