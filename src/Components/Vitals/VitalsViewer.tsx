import React, { ChangeEvent } from 'react';
import { PatientChart } from '../../Types/PatientProfile';
import { StudentVitalsReport } from '../../Types/Vitals';
import EmptyCard from '../Dashboard/Card/EmptyCard';
import TableHeader from '../TableHeader';
import { groupBy, filter, sortBy } from "lodash"
import { $error } from '../../Services/State';

type Props = {
    patient: PatientChart,
    className: string,
}

type State = {
    date: string
}
export default class VitalsViewer extends React.Component<Props, State> {
    private vitals: StudentVitalsReport[];

    constructor(props: Props) {
        super(props);
        if(this.props.patient) this.vitals = this.props.patient.studentVitals;
        else {
            $error.next("Please Scan patient barcode");
            this.vitals = [];
        }
        this.state = {
            date: this.getDates()[0]
        }
    }


    getDates(): string[] {
        const groupedByDate = groupBy(this.vitals, "date");
        return Object.keys(groupedByDate);
    }

    getSets(): string[] {
        const filtered = filter(this.vitals, { date:this.state.date });
        const sets = groupBy(filtered, "setName")
        return Object.keys(sets);
    }

    getVitals( setName: string) {
        const filtered = filter(this.vitals, { date:this.state.date, setName })
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
                <EmptyCard title="vitals">
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
                                            <td>Time</td>
                                            <td>Vital Name</td>
                                            <td>Vital Value</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.getVitals(setName).map((vital,j)=>(
                                            <tr key={j}  className="odd:bg-gray-100 even:bg-gray-300 h-10">
                                                <td>{vital.time}</td>
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