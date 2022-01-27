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

type State = {
    disabledTimeSlots: boolean[]
}

export default class ReportsSubmitterTabContent extends React.Component<Props, State> {

    constructor(props:Props) {
        super(props);
        const disabledTimeSlots = [];
        for(let i = 0; i<this.props.numberOfTimeSlots; i++) disabledTimeSlots.push(true);

        this.state = {
            disabledTimeSlots: disabledTimeSlots
        }
    }

    onTimeSlotChangeHandler(timeSlots: Array<string>) {
        const disabledTimeSlots = timeSlots.map(timeSlot=> !timeSlot)
        this.setState({disabledTimeSlots});
        this.props.onTimeSlotChanges(timeSlots);
    }

    public render() {
        return (
            <table className="w-full">
                <tbody>
                    <ReportsHeaderTimeSlots onChange={this.onTimeSlotChangeHandler.bind(this)} numberOfTimeSlots={this.props.numberOfTimeSlots}></ReportsHeaderTimeSlots>
                    {this.props.reportSet.reportFields.map((val, i) =>
                        <ReportInput
                            disabledTimeSlots={this.state.disabledTimeSlots}
                            onChange={(name, timeslotIndex, value) => this.props.onInputChangeHandler(name, timeslotIndex, value)}
                            key={i}
                            numberOfTimeSlots={this.props.numberOfTimeSlots}
                            vital={val} />
                    )}

                </tbody>
            </table>
        );
    }
}