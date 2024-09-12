import React from 'react';
import { Allergy } from '~/core/index';


export type Props = {
    allergy: Allergy
}
export default class AllergyEntry extends React.Component<Props> {

    public render() {
        return (
            <tr>
                <td className="border-2 p-2 border-trueGray-200">{this.props.allergy.name}</td>
                <td className="border-2 p-2 border-trueGray-200">{this.props.allergy.reaction}</td>
            </tr>
        );
    }
}