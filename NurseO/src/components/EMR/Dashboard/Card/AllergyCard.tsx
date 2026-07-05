import React from 'react';
import { type Allergy } from '~/core/index';
import AllergyEntry from './AllergyEntry';
import Card from './Card';
import { TableCell, TableHead, TableHeader, TableRow } from '~/components/common/ui/table';

type Props = React.HTMLAttributes<HTMLDivElement> & {
    allergies: Allergy[]
}

export default function AllergyCard(props: Props) {

    return (
        <Card title="Allergies" className={props.className}>
            <TableHeader className="font-bold">
                <TableRow>
                    <TableHead className="border-2 p-2 border-trueGray-200">Name</TableHead>
                    <TableHead className="border-2 p-2 border-trueGray-200">Reaction</TableHead>
                </TableRow>
            </TableHeader>
            <tbody>
                {props.allergies.length === 0 ?
                    <TableRow><TableCell colSpan={2} className='text-center p-2'><span>No allergies found</span></TableCell></TableRow> :
                    props.allergies.map((allergy, i) => <AllergyEntry key={i} allergy={allergy}></AllergyEntry>)
                }
            </tbody>
        </Card>

    );
}
