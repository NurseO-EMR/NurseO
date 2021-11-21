import React from 'react';
import { MedicationOrder } from '../../Types/PatientProfile';
import MedicationOrderSyntax from './MedicationOrderSyntax';


export type Props = {
    order: MedicationOrder
}
export default class OrderEntry extends React.Component<Props> {

    public render() {
        return (
            <tr className="hover:bg-red-700 hover:text-white transition-all duration-200  even:bg-gray-300">
                <td className="border-2 p-2">{this.props.order.orderType}</td>
                <td className="border-2 p-2">{this.props.order.doctorName}</td>
                <td className="border-2 p-2">
                    <MedicationOrderSyntax order={this.props.order}/>
                </td>
            </tr>
        );
    }
}