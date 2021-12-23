import React from 'react';
import { Note } from '../../../../Types/PatientProfile';
import ExtendableInput from '../../../Form/ExtendableInput';
import DataPreviewer from '../DataPreviewer';

type Props = {
    notes: Note[],
    onUpdate?: (updatedNotes: Note[]) => void
}
type State = {
    showModal: boolean
}
export default class NotesEditor extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            showModal: false
        }
        console.log(this.props.notes)
    }

    onItemDeletedHandler(data: Object) {
        const notes = data as Note[]
        if (this.props.onUpdate) this.props.onUpdate(notes);
    }

    public render() {
        return (
            <>
                <ExtendableInput id='noteEditor' label='Notes' editable={this.props.notes.length > 0} hideAddButton
                 onEditClick={() => this.setState({ showModal: true })} />

                <DataPreviewer onClose={() => this.setState({ showModal: false })}
                    onItemDeleted={this.onItemDeletedHandler.bind(this)}
                    data={this.props.notes} show={this.state.showModal} />
            </>
        );
    }
}