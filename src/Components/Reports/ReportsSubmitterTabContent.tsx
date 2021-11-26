import React from 'react';
import { $settings } from '../../Services/State';
import { ReportSet } from '../../Types/Report';
import ReportInput from './ReportInput';
import ReportsHeaderTimeSlots from './ReportsHeaderTimeSlots';

type Props = {
    reportSet: ReportSet,
    onInputChangeHandler: (filedName: string, timeSlotIndex: number, value: string) => void,
    onTimeSlotChanges: (timeSlots: Array<string>) => void
}

export default class ReportsSubmitterTabContent extends React.Component<Props> {

    public render() {
        return (
            <table className="w-full">
                <tbody>
                    <ReportsHeaderTimeSlots onChange={this.props.onTimeSlotChanges} numberOfTimeSlots={$settings.value!.numberOfTimeSlots}></ReportsHeaderTimeSlots>
                    {this.props.reportSet.reportFields.map((val, i) =>
                        <ReportInput
                            onChange={(name, index, value) => this.props.onInputChangeHandler(name, index, value)}
                            key={i}
                            numberOfTimeSlots={$settings.value!.numberOfTimeSlots}
                            vital={val} />
                    )}

                </tbody>
            </table>
        );
    }
}