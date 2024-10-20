import { useState, useContext } from 'react';
import { type Note } from '~/core/index';
import Card from './Card';
import PureModel from "react-pure-modal"
import { Button } from "../../Form/Button";
import { GlobalContext } from "~/services/State";
import { RichTextArea } from '~/components/common/RichTextArea';
import { RichTextViewer } from '~/components/common/RichTextViewer';
import { api } from '~/utils/api';
import { signInState } from '~/types/flags';

type Props = React.HTMLAttributes<HTMLDivElement> & {
    notes: Note[]
}

export default function NotesCard(props: Props) {
    const [openAddNoteModel, setOpenAddNoteModel] = useState(false)
    const [preViewModelNote, setPreviewModelNote] = useState("")
    const [newNote, setNewNote] = useState("")
    const { patient, setPatient, studentId } = useContext(GlobalContext)
    const addNoteMutation = api.emr.student_addNote.useMutation()


    const onEditClickHandler = async () => {
        const note: Note = {
            date: new Date().toLocaleString(),
            note: newNote
        }

        if (studentId !== signInState.anonymousSignIn.valueOf()) await addNoteMutation.mutateAsync({ note: note.note, date: note.date, patientId: patient.dbId })
        patient.notes.push(note)
        setPatient({ ...patient })
        setOpenAddNoteModel(false)
        setNewNote("")
    }

    return (
        <>
            <Card className={props.className} title="Notes" editable onEditClick={() => setOpenAddNoteModel(true)}>
                <thead className="font-bold">
                    <tr>
                        <td className="border-2 p-2 border-trueGray-200">Date</td>
                        <td className="border-2 p-2 border-trueGray-200">Note</td>
                    </tr>
                </thead>
                <tbody>
                    {props.notes?.length === 0 ?
                        <tr><td colSpan={2} className='text-center p-2 border-trueGray-200'><h1>No notes found</h1></td></tr> :
                        props.notes.map((n, i) => (
                            <tr key={i} className='hover:bg-primary hover:text-white transition-all duration-200  even:bg-gray-300 cursor-pointer border-trueGray-200 max-w-full'
                                onClick={() => setPreviewModelNote(n.note)}
                            >
                                <td className="border-2 p-2 border-trueGray-200">{n.date}</td>
                                <td className="border-2 p-2 border-trueGray-200">
                                    <div><RichTextViewer value={n.note} /></div>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </Card>


            <PureModel isOpen={openAddNoteModel} onClose={() => setOpenAddNoteModel(false)} header={"Nursing Note"} width="60vw">
                <div>
                    <label htmlFor="note" className={`text-primary text-xl font-bold`}>Enter New Note</label>
                    <RichTextArea onChange={e => setNewNote(e)} className="h-80 bg-white border mt-4" value={newNote} id='note' />
                    <Button onClick={onEditClickHandler} className="bg-primary mt-4 w-10/12 mx-auto block h-14">Add Note</Button>
                </div>
            </PureModel>

            <PureModel header="Note" width="80vw" isOpen={preViewModelNote.length > 0} onClose={() => setPreviewModelNote("")}>
                <div><RichTextViewer value={preViewModelNote} /></div>
            </PureModel>
        </>
    );
}
