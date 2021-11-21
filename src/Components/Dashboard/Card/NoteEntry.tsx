import React from 'react';
import PureModal from "react-pure-modal";
import { Note, NursingNoteType } from '../../../Types/PatientProfile';


export type Props = {
    note: Note
}

export type State = {
    shownNote: string
}
export default class NoteEntry extends React.Component<Props,State> {

    constructor(props:Props) {
        super(props);
        this.state = {
            shownNote: ""
        }
    }

    onModalClose() {
        this.setState({shownNote:""})
    }

    onClickHandler() {
        this.setState({
            shownNote: this.props.note.note
        })
    }

    getNoteTypeValue(type: NursingNoteType) {
        const index = Object.keys(NursingNoteType).indexOf(type);
        return Object.values(NursingNoteType)[index];
    }

    public render() {
        return (
            <>
            <tr className="hover:bg-red-700 hover:text-white cursor-pointer transition-all duration-200" onClick={this.onClickHandler.bind(this)}>
                <td className="border-2 p-2">{this.props.note.date.toString()}</td>
                <td className="border-2 p-2">{ this.getNoteTypeValue(this.props.note.type)}</td>
            </tr>

            <PureModal isOpen={!!this.state.shownNote} header="Note"
                 draggable={true} onClose={this.onModalClose.bind(this)} className="" width="60vw">
                     <div>
                          {this.props.note.note.split("\n").map((n,i)=><p key={i}>{n}</p>)}
                          <button onClick={this.onModalClose.bind(this)}
                            className="block m-auto bg-red-700 text-white py-2 px-6 rounded-full font-bold"
                          >Close</button>
                     </div>
            </PureModal>
            </>
        );
    }
}