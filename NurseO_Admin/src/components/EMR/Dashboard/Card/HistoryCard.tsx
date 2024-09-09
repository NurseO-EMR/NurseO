import { orderBy } from 'lodash';
import React from 'react';
import type { MedicalHistory } from '@nurse-o-core/index';
import Card from './Card';

type Props = React.HTMLAttributes<HTMLDivElement> & {
    history: MedicalHistory[],
}
export default class HistoryCard extends React.Component<Props> {

    getHistory() {
        const orderHistory = orderBy(this.props.history, "diagnosedDate", "desc");
        return orderHistory;
    }

    public render() {
        return (
            <Card className={this.props.className} title="Medical History">
            <thead className="font-bold">
                <tr>
                    <td className="border-2 p-2">Date</td>
                    <td className="border-2 p-2">Diagnosis</td>
                    <td className="border-2 p-2">Notes</td>
                </tr>
            </thead>
            <tbody>
                {this.props.history?.length === 0 ? 
                    <tr><td colSpan={2} className='text-center p-2'><h1>No records found</h1></td></tr>:
                    this.getHistory().map((history,i) => 
                    <tr key={i}>
                        <td className="border-2 p-2">{history.date}</td>
                        <td className="border-2 p-2">{history.title}</td>
                        <td className="border-2 p-2">{history.notes}</td>
                    </tr>)
                }
            </tbody>
        </Card>
        )

    }
}