import { orderBy } from 'lodash';
import { type FormEvent, useContext, useState } from 'react';
import PureModel from "react-pure-modal"
import type { MedicalHistory } from '~/core/index';
import Card from './Card';
import { Button } from '../../Form/Button';
import { RichTextArea } from '~/components/common/RichTextArea';
import VerticalInput from '../../Form/verticalInput';
import { GlobalContext } from '~/services/State';
import { RichTextViewer } from '~/components/common/RichTextViewer';
import { signInState } from '~/types/flags';
import { api } from '~/utils/api';
import { TableBody, TableCell, TableHead, TableHeader, TableRow } from '~/components/common/ui/table';

type Props = React.HTMLAttributes<HTMLDivElement> & {
    history: MedicalHistory[],
}
export default function HistoryCard(props: Props) {

    const [openAddHistoryModel, setOpenAddHistoryModel] = useState(false)
    const [newHistoryDate, setNewHistoryDate] = useState("")
    const [newHistoryTitle, setNewHistoryTitle] = useState("")
    const [newHistoryNote, setNewHistoryNote] = useState("")
    const { patient, setPatient, studentId } = useContext(GlobalContext)
    const addMedicalHistoryMutation = api.emr.student_addMedicalHistory.useMutation()

    const getHistory = () => {
        const orderHistory = orderBy(props.history, "diagnosedDate", "desc");
        return orderHistory;
    }


    const onEditClickHandler = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const newHistory: MedicalHistory = {
            date: newHistoryDate,
            title: newHistoryTitle,
            notes: newHistoryNote
        }

        if (studentId !== signInState.anonymousSignIn.valueOf()) await addMedicalHistoryMutation.mutateAsync({ patientId: patient.dbId, medicalHistory: newHistory });

        patient.medicalHistory.push(newHistory)

        setPatient({ ...patient })
        setOpenAddHistoryModel(false)
        setNewHistoryDate("")
        setNewHistoryTitle("")
        setNewHistoryNote("")
    }

    return (
        <>
            <Card className={props.className} title="Medical History" editable onEditClick={() => setOpenAddHistoryModel(true)}>
                <TableHeader className="font-bold">
                    <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Diagnosis</TableHead>
                        <TableHead>Notes</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {props.history?.length === 0 ?
                        <TableRow><TableCell colSpan={3} className='text-center p-2'><h1>No records found</h1></TableCell></TableRow> :
                        getHistory().map((history, i) =>
                            <TableRow key={i} className=' '>
                                <TableCell>{history.date}</TableCell>
                                <TableCell>{history.title}</TableCell>
                                <TableCell><RichTextViewer value={history.notes} /></TableCell>
                            </TableRow>)
                    }
                </TableBody>
            </Card>

            <PureModel isOpen={openAddHistoryModel} onClose={() => setOpenAddHistoryModel(false)} header={"Adding Medical History"} width="60vw">
                <form onSubmit={onEditClickHandler} >
                    <VerticalInput onChange={e => setNewHistoryDate(e.currentTarget.value)} type='date'>Date</VerticalInput>
                    <VerticalInput onChange={e => setNewHistoryTitle(e.currentTarget.value)}>Diagnosis Title</VerticalInput>
                    <label htmlFor="note" className={`font-bold`}>Enter New Note</label>
                    <RichTextArea onChange={e => setNewHistoryNote(e)} className="h-80 bg-white border mt-2" value={newHistoryNote} id='note' />
                    <Button className="bg-primary mt-4 w-10/12 mx-auto block h-14">Add Medication History</Button>
                </form>
            </PureModel>
        </>
    )

}
