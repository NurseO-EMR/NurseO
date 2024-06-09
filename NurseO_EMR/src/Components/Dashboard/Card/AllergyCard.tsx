import React from 'react';
import { type Allergy } from '@nurse-o-core/index';
import AllergyEntry from './AllergyEntry';
import Card from './Card';

type Props = React.HTMLAttributes<HTMLDivElement> & {
    allergies: Allergy[] | undefined,
}

export default function AllergyCard(props: Props) {

    return (
        <Card title="Allergies" className={props.className}>
            <thead className="font-bold">
                <tr>
                    <td className="border-2 p-2">Name</td>
                    <td className="border-2 p-2">Reaction</td>
                </tr>
            </thead>
            <tbody>
                {props.allergies?.length === 0 ?
                    <tr><td colSpan={2} className='text-center p-2'><h1>No allergies found</h1></td></tr> :
                    props.allergies?.map((allergy, i) => <AllergyEntry key={i} allergy={allergy}></AllergyEntry>)
                }
            </tbody>
        </Card>

    );
}
