import React from 'react';
import { ReportSet } from '../../Types/Report';
import ReportInput from './ReportInput';
import ReportsHeaderTimeSlots from './ReportsHeaderTimeSlots';

type Props = {
    reportSet: ReportSet,
    onInputChangeHandler: (filedName: string, timeSlotIndex: number, value: string) => void,
    onTimeSlotChanges: (timeSlots: Array<string>) => void,
    numberOfTimeSlots: number
}

export default class ReportsSubmitterTabContent extends React.Component<Props> {
    public render() {
        return (
            <table className="w-full">
                <tbody>
                    <ReportsHeaderTimeSlots onChange={this.props.onTimeSlotChanges} numberOfTimeSlots={this.props.numberOfTimeSlots}></ReportsHeaderTimeSlots>
                    {this.props.reportSet.reportFields.map((val, i) =>
                        <ReportInput
                            onChange={(name, index, value) => this.props.onInputChangeHandler(name, index, value)}
                            key={i}
                            numberOfTimeSlots={this.props.numberOfTimeSlots}
                            vital={val} />
                    )}

                </tbody>
            </table>
        );
    }
}