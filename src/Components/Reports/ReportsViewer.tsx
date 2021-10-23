import React, { ChangeEvent } from 'react';
import { StudentReport } from '../../Types/Report';
import EmptyCard from '../Dashboard/Card/EmptyCard';
import TableHeader from '../TableHeader';
import { groupBy, filter, sortBy } from "lodash"

type Props = {
    studentReport: StudentReport[],
    className?: string,
}

type State = {
    date: string
}
export default class ReportsViewer extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            date: this.getDates()[0]
        }
    }


    getDates(): string[] {
        const groupedByDate = groupBy(this.props.studentReport, "date");
        return Object.keys(groupedByDate);
    }

    getSets(): string[] {
        const filtered = filter(this.props.studentReport, { date:this.state.date });
        const sets = groupBy(filtered, "setName")
        return Object.keys(sets);
    }

    getVitals( setName: string) {
        const filtered = filter(this.props.studentReport, { date:this.state.date, setName })
        const sorted = sortBy(filtered, "time")
        return sorted;
    }

    onDateChangeHandler(event: ChangeEvent<HTMLSelectElement>) {
        this.setState({
            date: event.target.value
        })
    }

    public render() {
        return (
            <div className={this.props.className}>
                <EmptyCard title="Vitals">
                    <div className="px-28">
                        <div className="flex justify-between px-8 pt-4">
                            <div>
                                <label className="font-bold">Date: </label>
                                <select value={this.state.date} onChange={this.onDateChangeHandler.bind(this)} className="border-2 text-center">
                                    {this.getDates().map((date,i) => (
                                        <option value={date} key={i}>{date}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {this.getSets().map((setName,i)=>(
                            <div key={i}>
                                <TableHeader>{setName}</TableHeader>
                                <table className="w-full m-auto">
                                    <thead className="font-bold">
                                        <tr>
                                            <td className="pl-8">Time</td>
                                            <td>Vital Name</td>
                                            <td>Vital Value</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.getVitals(setName).map((vital,j)=>(
                                            <tr key={j}  className="odd:bg-gray-100 even:bg-gray-300 h-10">
                                                <td className="pl-8">{vital.time}</td>
                                                <td>{vital.vitalName}</td>
                                                <td>{vital.value}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ))}
                    </div>
                </EmptyCard>
            </div>

        );
    }
}