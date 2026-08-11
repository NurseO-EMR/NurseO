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
                    <th className="border-2 p-2 border-trueGray-200">Generic</th>
                    <th className="border-2 p-2 border-trueGray-200">Brand</th>
                    <th className="border-2 p-2 border-trueGray-200">Dose</th>
                    <th className="border-2 p-2 border-trueGray-200">Route</th>
                    <th className="border-2 p-2 border-trueGray-200">Frequency</th>
                    <th className="border-2 p-2 border-trueGray-200">Routine</th>
                    <th className="border-2 p-2 border-trueGray-200">Notes</th>
                    {isThereICD10Code ? <th className="border-2 p-2 border-trueGray-200">Dispense Quantity</th> : null}
                    {isThereICD10Code ? <th className="border-2 p-2 border-trueGray-200">Refills</th> : null}
                    {isThereICD10Code ? <th className="border-2 p-2 border-trueGray-200">ICD10</th> : null}
                </tr>
            </thead>
            <tbody>
                {props.medications.length > 0 ?
                    props.medications.map((medication, i) => <MedicationEntry isThereICD10Code={isThereICD10Code} key={i} order={medication}></MedicationEntry>) :
                    <tr><td colSpan={isThereICD10Code ? 10 : 7}><span className='text-center py-2'>No medications added</span></td></tr>
                }
            </tbody>
        </Card>

    );
}
