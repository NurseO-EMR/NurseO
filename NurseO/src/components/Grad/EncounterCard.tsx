import { useState, useContext } from 'react';
import { type Note } from '~/core/index';
import Card from '~/components/EMR/Dashboard/Card/Card';
import { Button } from "~/components/EMR/Form/Button";
import { GlobalContext } from "~/services/State";
import { RichTextArea } from '~/components/common/RichTextArea';
import { RichTextViewer } from '~/components/common/RichTextViewer';
import { api } from '~/utils/api';
import { signInState } from '~/types/flags';
import { Dialog, DialogClose, DialogContent, DialogTitle } from '../common/ui/dialog';
import { TableCell, TableHead, TableHeader, TableRow } from '../common/ui/table';

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
        setNewNote(noteTemplate)
    }

    return (
        <>
            <Card className={props.className} title="Encounters" editable >
                <TableHeader className="font-bold">
                    <TableRow>
                        <TableHead className="text-left border-2 p-2 border-trueGray-200">Type</TableHead>
                        <TableHead className="text-left border-2 p-2 border-trueGray-200">Date</TableHead>
                        <TableHead className="text-left border-2 p-2 border-trueGray-200 w-8/12">Note</TableHead>
                    </TableRow>
                </TableHeader>
                <tbody>
                    {props.notes?.length === 0 ?
                        <TableRow><TableCell colSpan={3} className='text-center p-2 border-trueGray-200 font-bold'>No encounters found</TableCell></TableRow> :
                        props.notes.map((n, i) => (
                            <TableRow key={i} className='hover:bg-primary hover:text-white transition-all duration-200  even:bg-gray-300 cursor-pointer border-trueGray-200 max-w-full'
                                onClick={() => setPreviewModelNote(n.note)}
                            >
                                <TableCell className="border-2 p-2 border-trueGray-200">{n.type}</TableCell>
                                <TableCell className="border-2 p-2 border-trueGray-200">{n.date}</TableCell>
                                <TableCell className="border-2 p-2 border-trueGray-200">
                                    <div><RichTextViewer value={n.note} /></div>
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </tbody>
                <DialogContent className="w-[60vw]">
                    <DialogTitle>Nursing Note</DialogTitle>
                    <div>
                        <label htmlFor="note" className={`text-primary text-xl font-bold`}>Enter New Note</label>
                        <RichTextArea onChange={e => setNewNote(e)} className="h-80 bg-white border mt-4" value={newNote} id='note' />
                        <DialogClose className='w-full'>
                            <Button onClick={onEditClickHandler} className="bg-primary mt-4 w-10/12 mx-auto block h-14">Add Note</Button>
                        </DialogClose>
                    </div>
                </DialogContent>
            </Card>

            <Dialog open={preViewModelNote.length > 0} onOpenChange={(s) => s === false ? setPreviewModelNote("") : null}>
                <DialogContent className='min-w-[80vw] '>
                    <DialogTitle>Note</DialogTitle>
                    <div><RichTextViewer value={preViewModelNote} /></div>
                </DialogContent>
            </Dialog>
        </>
    );
}
