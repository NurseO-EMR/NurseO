import React, { useMemo } from 'react';
import { type MedicationOrder } from '~/core/index';
import Card from './Card';
import MedicationEntry from './MedicationEntry';

type Props = React.HTMLAttributes<HTMLDivElement> & {
    medications: MedicationOrder[],
}

export default function MedicationCard(props: Props) {
    const isThereICD10Code = useMemo(() => props.medications.filter(m => m.icd10?.code?.length).length > 0, [props.medications])
    return (
        <Card title="Medications" className={props.className} >
            <thead className="font-bold">
                <tr>
                    <td className="border-2 p-2 border-trueGray-200">Generic</td>
                    <td className="border-2 p-2 border-trueGray-200">Brand</td>
                    <td className="border-2 p-2 border-trueGray-200">Dose</td>
                    <td className="border-2 p-2 border-trueGray-200">Route</td>
                    <td className="border-2 p-2 border-trueGray-200">Frequency</td>
                    <td className="border-2 p-2 border-trueGray-200">Routine</td>
                    <td className="border-2 p-2 border-trueGray-200">Notes</td>
                    {isThereICD10Code ? <td className="border-2 p-2 border-trueGray-200">Dispense Quantity</td> : null}
                    {isThereICD10Code ? <td className="border-2 p-2 border-trueGray-200">Refills</td> : null}
                    {isThereICD10Code ? <td className="border-2 p-2 border-trueGray-200">ICD10</td> : null}
                </tr>
            </thead>
            <tbody>
                {props.medications.length > 0 ?
                    props.medications.map((medication, i) => <MedicationEntry isThereICD10Code={isThereICD10Code} key={i} order={medication}></MedicationEntry>) :
                    <tr><td colSpan={isThereICD10Code ? 10 : 7}><h1 className='text-center py-2'>No medications added</h1></td></tr>
                }
            </tbody>
        </Card>

    );
}
