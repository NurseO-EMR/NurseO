import { useState, useContext } from 'react';
import { type Note } from '~/core/index';
import Card from '~/components/EMR/Dashboard/Card/Card';
import PureModel from "react-pure-modal"
import { Button } from "~/components/EMR/Form/Button";
import { GlobalContext } from "~/services/State";
import { RichTextArea } from '~/components/common/RichTextArea';
import { RichTextViewer } from '~/components/common/RichTextViewer';
import { api } from '~/utils/api';
import { signInState } from '~/types/flags';

type Props = React.HTMLAttributes<HTMLDivElement> & {
    notes: Note[]
}

const noteTemplate = `
<b><u>History of Present Illness (HPI):</u></b><br>
<br>
<br>
<b><u>Review of Systems:</u></b><br>
Constitutional:<br>
HENT:<br>
Eyes:<br>
Respiratory:<br>
Cardiovascular:<br>
Gastrointestinal:<br>
Endocrine:<br>
Genitourinary:<br>
Musculoskeletal:<br>
Allergic/Immunologic:<br>
Neurologic:<br>
Hematologic:<br>
Skin:<br>
Psychiatric/Behavioral:<br><br>

<b><u>Physical Exam:</u></b><br>
Vital Signs:<br>
Constitutional:<br>
HENT:<br>
Eyes:<br>
Cardiovascular:<br>
<br>
Pulmonary/Chest:<br>
Abdominal/Gastrointestinal:<br>
Musculoskeletal:<br>
Neurological:<br>
Skin:<br>
Psychiatric:<br>
<br>
<b><u>Medical Decision Making:</u></b><br>
<ol>
    <li>Diagnosis:
        <ul>
            <li>ICD-10:</li>
            <li>Medical Decision Making:</li>
            <li>Associated orders:</li>
        </ul>
    </li>
</ol><br>
Wrap up/Patient Education/Follow Up Recommendations:<br>
E/M Code:<br>
Signed:<br>
`

export default function EncounterCard(props: Props) {
    const [openAddNoteModel, setOpenAddNoteModel] = useState(false)
    const [preViewModelNote, setPreviewModelNote] = useState("")
    const [newNote, setNewNote] = useState(noteTemplate)
    const { patient, setPatient, studentId } = useContext(GlobalContext)
    const addNoteMutation = api.emr.student_addNote.useMutation()


    const onEditClickHandler = async () => {
        const note: Note = {
            type: "Provider Note",
            date: new Date().toLocaleString(),
            note: newNote
        }

        if (studentId !== signInState.anonymousSignIn.valueOf()) await addNoteMutation.mutateAsync({ note: note.note, date: note.date, type: note.type, patientId: patient.dbId })
        patient.notes.push(note)
        setPatient({ ...patient })
        setOpenAddNoteModel(false)
        setNewNote(noteTemplate)
    }

    return (
        <>
            <Card className={props.className} title="Encounters" editable onEditClick={() => setOpenAddNoteModel(true)}>
                <thead className="font-bold">
                    <tr>
                        <th className="text-left border-2 p-2 border-trueGray-200">Type</th>
                        <th className="text-left border-2 p-2 border-trueGray-200">Date</th>
                        <th className="text-left border-2 p-2 border-trueGray-200 w-8/12">Note</th>
                    </tr>
                </thead>
                <tbody>
                    {props.notes?.length === 0 ?
                        <tr><td colSpan={3} className='text-center p-2 border-trueGray-200 font-bold'>No encounters found</td></tr> :
                        props.notes.map((n, i) => (
                            <tr key={i} className='hover:bg-primary hover:text-white transition-all duration-200  even:bg-gray-300 cursor-pointer border-trueGray-200 max-w-full'
                                onClick={() => setPreviewModelNote(n.note)}
                            >
                                <td className="border-2 p-2 border-trueGray-200">{n.type}</td>
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
