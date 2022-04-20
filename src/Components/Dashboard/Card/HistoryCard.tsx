import { orderBy } from 'lodash';
import React from 'react';
import { MedicalIssue } from '../../../Types/PatientProfile';
import Card from './Card';

type Props = React.HTMLAttributes<HTMLDivElement> & {
    history: MedicalIssue[],
    preview?: boolean
}
export default class HistoryCard extends React.Component<Props> {

    getHistory() {
        const orderHistory = orderBy(this.props.history, "diagnosedDate", "desc");
        return orderHistory;
    }

    public render() {
        return (
            <Card className={this.props.className} title="History" admin={this.props.preview}>
            <thead className="font-bold">
                <tr>
                    <td className="border-2 p-2">Date</td>
                    <td className="border-2 p-2">Name</td>
                    <td className="border-2 p-2">Assessment</td>
                </tr>
            </thead>
            <tbody>
                {this.props.history?.length === 0 ? 
                    <tr><td colSpan={2} className='text-center p-2'><h1>No records found</h1></td></tr>:
                    this.getHistory().map((history,i) => 
                    <tr key={i}>
                        <td className="border-2 p-2">{history.diagnosedDate}</td>
                        <td className="border-2 p-2">{history.name}</td>
                        <td className="border-2 p-2">{history.assessment}</td>
                    </tr>)
                }
            </tbody>
        </Card>
        )

    }
}