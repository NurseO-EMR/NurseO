import React from 'react';

type Props = {
    numberOfTimeSlots: number | undefined
}
export default class VitalsHeaderTimeSlots extends React.Component<Props> {

    public render() {	
        return (
            <tr>
                <td>Time</td>
                {[...new Array(this.props.numberOfTimeSlots)].map( (val,i) =>
                    <td key={i} >
                        <input className="w-9/12 text-center border-2" type="time" />
                    </td>
                )}
            </tr>
        );
    }	
}