import { useContext, useState } from 'react';
import { GlobalContext } from '~/services/State';
import type { Note, ReportType, StudentReport } from "~/core/index";
import { getTodaysDateAsString } from '~/services/Util';
import ReportsSubmitterTabContent from './ReportsSubmitterTabContent';
import ReportTabs from './ReportTabs';
import SaveButton from '../Form/SaveButton';
import { api } from '~/utils/api';
import { useRouter } from 'next/navigation';
import { signInState } from '~/types/flags';
import TextArea from '../Form/TextArea';

type Props = React.HTMLAttributes<HTMLDivElement> & {
    reportType: ReportType,
    title: string,
    viewPageURL: string
}
export default function ReportsSubmitter(props: Props) {

    const { patient, studentId, setPatient } = useContext(GlobalContext)
    const { data: reportSets } = api.report.student_getReportSets.useQuery({ reportType: props.reportType })
    const studentReportsMutation = api.report.student_saveStudentsReports.useMutation()
    const addNoteMutation = api.patient.student_addNote.useMutation()
    const [date, setDate] = useState(getTodaysDateAsString())
    const [selectedTabIndex, setSelectedTabIndex] = useState(0)
    const [note, setNote] = useState("")
    const [time, setTime] = useState("")
    const [studentReports, setStudentReports] = useState<{ felidName: string, time: string, value: string, date: string }[]>([])
    const router = useRouter()

    const onInputChangeHandler = (felidName: string, timeSlotIndex: number, value: string) => {
        const index = studentReports.findIndex(r => r.felidName === felidName && r.date === date && r.time === time)
        if (index > -1) {
            studentReports[index] = { date, felidName, time, value }
        } else {
            studentReports.push({ date, felidName, time, value })
        }

        setStudentReports(studentReports)
    }

    const onSaveClickHandler = async (wait: () => void, keepGoing: () => void) => {
        wait()
        const output: StudentReport[] = studentReports.map(r => {
            const report: StudentReport = {
                date: r.date,
                fieldName: r.felidName,
                reportType: props.reportType,
                setName: reportSets![selectedTabIndex]!.name, // it would not get to this stage if not all of these exist 
                time: r.time,
                value: r.value
            }
            return report
        })

        if (studentId !== signInState.anonymousSignIn.valueOf()) {
            await Promise.all([
                studentReportsMutation.mutateAsync({ patientId: patient.dbId, studentReport: output }),
                addNoteMutation.mutateAsync({ date, note, patientId: patient.dbId })
            ])
        }

        const tempPatient = { ...patient }
        tempPatient.studentReports.push(...output)
        const formattedNote = getNote()
        console.log(formattedNote)
        if (formattedNote) tempPatient.notes.push(formattedNote)

        setPatient({ ...patient })

        keepGoing()
        router.push(props.viewPageURL)
    }

    const getNote = () => {
        if (!reportSets?.[selectedTabIndex]) return;

        const temp: Note = {
            date,
            note
        }

        return temp;
    }

    return (
        <div className="px-3.5">
            <div className="flex justify-between px-8 pt-4">
                <div>
                    <label className="font-bold">Date: </label>
                    <input value={date} onChange={e => setDate(e.currentTarget.value)} className="border-2 text-center" type="Date" />
                </div>
                <SaveButton onClick={onSaveClickHandler}
                    className={`bg-primary text-white rounded-full px-8 py-1`}
                />
            </div>


            <ReportTabs onTabSelectionHandler={setSelectedTabIndex} reportSets={reportSets?.map(report => report.name)}
                selectedTab={selectedTabIndex} />


            {reportSets?.[selectedTabIndex] ?
                <ReportsSubmitterTabContent
                    numberOfTimeSlots={1}
                    onInputChangeHandler={onInputChangeHandler}
                    reportSet={reportSets[selectedTabIndex]} // checked in the above if statement 
                    onTimeSlotChanges={setTime}
                />
                : null}

            <TextArea label='Nurse Note' onChange={e => setNote(e.currentTarget.value)} />

        </div>
    );
}
