import React from 'react';
import { PatientChart } from '../Types/PatientProfile';

type Props = React.HTMLAttributes<HTMLDivElement> & {
    patient: PatientChart
}

export default class Mar extends React.Component<Props> {

    private numbers = [1,2,3,4,5];

    public render() {
        return (
            <table className={"table-auto w-full " + this.props.className}>
                <thead className="w-full h-16">
                    <tr className="bg-red-500 text-white">
                        <th></th>
                        <th>13:00</th>
                        <th>14:00</th>
                        <th>15:00</th>
                        <th>16:00</th>
                        <th>17:00</th>
                        <th>18:00</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.numbers.map(n=>{
                            return (
                                <tr className="odd:bg-gray-100 even:bg-gray-300 h-32">
                                    <td className="w-80 pl-16 font-semibold">Acetaminophen (0.15mg/kg) 6HR PRN temp {">"} 39.5  or discomfort</td>
                                    <th>-</th>
                                    <th>-</th>
                                    <th>-</th>
                                    <th>Due</th>
                                    <th>-</th>
                                    <th>-</th>
                                </tr>
                            )
                            
                        })
                    }
                    

                </tbody>
            </table>

        );
    }
}