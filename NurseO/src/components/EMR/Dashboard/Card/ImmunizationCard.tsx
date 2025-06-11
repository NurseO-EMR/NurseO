import React from 'react';
import Card from './Card';
import { type Immunization } from '~/core';

type Props = React.HTMLAttributes<HTMLDivElement> & {
    immunizations: Immunization[],
}

export default function ImmunizationCard(props: Props) {

    return (
        <Card className={props.className} title="Immunization Record">
            <thead className="font-bold">
                <tr>
                    <th className="border-2 p-2 border-trueGray-200 text-left">Date</th>
                    <th className="border-2 p-2 border-trueGray-200 text-left">Immunization</th>
                </tr>
            </thead>
            <tbody>
                {props.immunizations?.length === 0 ?
                    <tr><td colSpan={2} className='text-center p-2 border-trueGray-200'><h1>No immunizations record found</h1></td></tr> :
                    props.immunizations.map((record, i) => <tr className='border border-trueGray-200' key={i}>
                        <td className='px-4 py-2 border-trueGray-200 border'>{record.date}</td>
                        <td className='px-4 py-2 border-trueGray-200 border'>{record.immunization}</td>
                    </tr>)
                }
            </tbody>
        </Card>

    );
}	
