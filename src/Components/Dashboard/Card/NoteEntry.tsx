import React from 'react';
import { Note } from '../../../Types/PatientProfile';


export type Props = {
    note: Note
}
export default class NoteEntry extends React.Component<Props> {

    public render() {
        return (
            <tr>
                <td className="border-2 p-2">{this.props.note.date.toString()}</td>
                <td className="border-2 p-2">{this.props.note.visitReason}</td>
                <td className="border-2 p-2">{this.props.note.appearance}</td>
                <td className="border-2 p-2">{this.props.note.vitalsSummery}</td>
                <td className="border-2 p-2">{this.props.note.assessment}</td>
            </tr>
        );
    }
}