import { filter } from 'lodash';
import React from 'react';
import { $providerOrdersAvailable } from '../../../Services/State';
import { MedicationOrder, OrderType } from '../../../Types/PatientProfile';
import Card from './Card';
import MedicationEntry from './MedicationEntry';

type Props = React.HTMLAttributes<HTMLDivElement> &  {
    medications: MedicationOrder[] | undefined,
    preview?: boolean
}


type State = {
    filteredOrders: MedicationOrder[]
}

export default class MedicationCard extends React.Component<Props, State> {

    
    constructor(props:Props) {
        super(props);

        if($providerOrdersAvailable.value) {
            this.state = {
                filteredOrders: this.props.medications!
            }
        } else {
            this.state = {
                filteredOrders: filter(this.props.medications, order=> order.orderType !== OrderType.provider)
            }
        }
    }


    public render() {
        return (
            <Card title="Medications" className={this.props.className} preview={this.props.preview}>
                <thead className="font-bold">
                    <tr>
                        <td className="border-2 p-2">Name</td>
                        <td className="border-2 p-2">Concentration</td>
                        <td className="border-2 p-2">Route</td>
                        <td className="border-2 p-2">Frequency</td>
                        <td className="border-2 p-2">Routine</td>
                        <td className="border-2 p-2">Notes</td>
                    </tr>
                </thead>
                <tbody>
                    {this.state.filteredOrders ? 
                        this.state.filteredOrders.map((medication,i) => <MedicationEntry key={i} medication={medication}></MedicationEntry>): 
                        <tr><td><h1>No medications added</h1></td></tr>
                    }
                </tbody>
            </Card>

        );
    }
}