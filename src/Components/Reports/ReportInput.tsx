import React from 'react';
import { Report } from '../../Types/Report';
import ReportDynamicInput from './ReportDynamicInput';

type Props = {
    numberOfTimeSlots: number | undefined,
    vital: Report,
    onChange: (filedName: string, timeSlotIndex: number, value: string) => void,
    disabledTimeSlots: boolean[],
}
export default class ReportInput extends React.Component<Props> {

    onChangeHandler(value: string, key: number) {
        const vitalName = this.props.vital.name;
        this.props.onChange(vitalName, key - 1, value);
    }

    public render() {
        if (this.props.numberOfTimeSlots === undefined) return null;

        return (
            <tr className="w-9/12 odd:bg-gray-100 even:bg-gray-300 h-14">
                {[...new Array(this.props.numberOfTimeSlots + 1)].map((_, i) => {
                    if (i === 0) return <td key={i} className="font-bold pl-4 w-3/12">{this.props.vital.name}</td>
                    else {
                        const disabled = this.props.disabledTimeSlots[i-1];
                        return <td key={i}>

                            <ReportDynamicInput fieldType={this.props.vital.fieldType} index={i} onChange={this.onChangeHandler.bind(this)} 
                                disabled={disabled} options={this.props.vital.VitalsOptions}
                            /> 
                        </td>
                    }
                })}

            </tr>

        );
    }
}