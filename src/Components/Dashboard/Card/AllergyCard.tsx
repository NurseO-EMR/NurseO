import React from 'react';
import { Allergy } from '../../../Types/PatientProfile';
import AllergyEntry from './AllergyEntry';
import Card from './Card';

type Props = {
    allergies: Allergy[] | undefined
}

export default class AllergyCard extends React.Component<Props> {

    public render() {
        return (
            <Card title="Allergies">
            <thead className="font-bold">
                <tr>
                    <td className="border-2 p-2">Name</td>
                    <td className="border-2 p-2">Reaction</td>
                </tr>
            </thead>
            <tbody>
                {this.props.allergies ? 
                    this.props.allergies.map(allergy => <AllergyEntry allergy={allergy}></AllergyEntry>): 
                    <h1>No allergies added</h1>
                }
            </tbody>
        </Card>

        );
    }
}