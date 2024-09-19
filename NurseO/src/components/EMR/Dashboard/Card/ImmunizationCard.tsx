import React from 'react';
import Card from './Card';

type Props = React.HTMLAttributes<HTMLDivElement> & {
    immunizations: string[],
}

export default function ImmunizationCard(props: Props) {

    return (
        <Card className={props.className} title="Immunizations">
            <thead className="font-bold">
                <tr>
                    <td className="border-2 p-2 border-trueGray-200">Taken Immunization</td>
                </tr>
            </thead>
            <tbody>
                {props.immunizations?.length === 0 ?
                    <tr><td colSpan={2} className='text-center p-2 border-trueGray-200'><h1>No immunizations record found</h1></td></tr> :
                    props.immunizations.map((immunization, i) => <tr className='border border-trueGray-200' key={i}>
                        <td className='px-4 py-2 border-trueGray-200'>{immunization}</td>
                    </tr>)
                }
            </tbody>
        </Card>

    );
}	
