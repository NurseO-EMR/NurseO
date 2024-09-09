import React from 'react';
import { type MedicationOrder } from '@nurse-o-core/index';
import Card from './Card';
import MedicationEntry from './MedicationEntry';

type Props = React.HTMLAttributes<HTMLDivElement> & {
    medications: MedicationOrder[],
}

export default function MedicationCard(props: Props) {

    return (
        <Card title="Medications" className={props.className} >
            <thead className="font-bold">
                <tr>
                    <td className="border-2 p-2">Generic</td>
                    <td className="border-2 p-2">Brand</td>
                    <td className="border-2 p-2">Dose</td>
                    <td className="border-2 p-2">Route</td>
                    <td className="border-2 p-2">Frequency</td>
                    <td className="border-2 p-2">Routine</td>
                    <td className="border-2 p-2">Notes</td>
                </tr>
            </thead>
            <tbody>
                {props.medications.length > 0 ?
                    props.medications.map((medication, i) => <MedicationEntry key={i} order={medication}></MedicationEntry>) :
                    <tr><td colSpan={6}><h1 className='text-center py-2'>No medications added</h1></td></tr>
                }
            </tbody>
        </Card>

    );
}
