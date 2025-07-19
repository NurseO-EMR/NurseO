

import { Input } from "~/components/common/ui/input"
import { Label } from "~/components/common/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/common/ui/tabs"
import { Button } from "~/components/common/ui/button"
import { EmptyCard } from "~/components/Med/EmptyCard"
import { api } from "~/utils/api"
import { type StudentReport, type ReportType } from "~/core"
import { ReportDynamicInput } from "./ReportDynamicInput"
import { useContext, useState } from "react"
import { GlobalContext } from "~/services/State"
import { Announcement, broadcastAnnouncement } from "~/services/AnnouncementService"
import Image from "next/image"
import { signInState } from "~/types/flags"
import { useRouter } from "next/navigation"

type Props = React.HTMLAttributes<HTMLDivElement> & {
    reportType: ReportType,
    title: string,
    viewPageURL: string
}

export default function ReportsSubmitter(props: Props) {

    const { data: reportSets, isLoading } = api.emr.student_getReportSets.useQuery({ reportType: props.reportType })
    const reportSubmitMutation = api.emr.student_saveStudentsReports.useMutation()
    const { patient, setPatient, studentId } = useContext(GlobalContext)
    const router = useRouter()

    const [studentReportsMap, setStudentReportsMap] = useState<Map<string, StudentReport>>(new Map())
    const [date, setDate] = useState(new Date().toISOString().split("T")[0]!)
    const [time, setTime] = useState("")

    const onSubmitHandler = async () => {
        const studentsReportsArray = [...studentReportsMap.values()]
        if (studentId !== signInState.anonymousSignIn.valueOf()) {
            const { err } = await reportSubmitMutation.mutateAsync({ patientId: patient.dbId, studentReports: studentsReportsArray })
            if (err) return broadcastAnnouncement(err, Announcement.error)
            else broadcastAnnouncement("Submitted", Announcement.success)
        }


        patient.studentReports = studentsReportsArray
        setPatient({ ...patient })
        router.push(props.viewPageURL)
    }

    const onChangeHandler = (setName: string, fieldName: string, value: string) => {
        const keySyntax = `${setName}-${fieldName}`
        const studentReport: StudentReport = {
            date,
            reportType: props.reportType,
            time: time,
            setName: setName,
            fieldName: fieldName,
            value: value
        }
        const report = studentReportsMap.get(keySyntax)
        if (!report) {
            studentReportsMap.set(keySyntax, studentReport)
        } else {
            if (value.length === 0) {
                studentReportsMap.delete(keySyntax)
            } else {
                report.value = value
                studentReportsMap.set(keySyntax, report)
            }
        }

        setStudentReportsMap(studentReportsMap)
    }



    if (isLoading) return <div>Loading...</div>
    return (
        <EmptyCard title={props.title}>

            <div className="flex justify-between px-10 py-10 items-center">
                <div className="flex gap-10 items-center">
                    <Label htmlFor="formDate" className="text-sm font-medium">Date</Label>
                    <Input id="formDate" type="date" defaultValue={date} onChange={e => setDate(e.currentTarget.value)} className="w-full" />
                </div>
                <Button onClick={onSubmitHandler} className="bg-primary hover:*:first-letter:bg-primary/90 text-white px-6 py-2">Save</Button>
            </div>

            <div>
                <Tabs defaultValue={reportSets?.[0]?.name} className="w-full">
                    <TabsList className="grid w-full grid-cols-5 lg:grid-cols-10 h-auto" role="tablist">
                        {reportSets?.map((set) => (
                            <TabsTrigger key={set.name} value={set.name} role="tab" aria-controls={`${set.name}-panel`} className="text-xs p-2">{set.name}</TabsTrigger>
                        ))}
                    </TabsList>

                    {reportSets?.map((set) => (
                        <TabsContent value={set.name} id={`${set.name}-panel`} role="tabpanel" className="mt-6" key={set.name}>
                            <div className="space-y-8">

                                {set.image && set.imageAlt ?
                                    <Image src={set.image} alt={set.imageAlt} width={662} height={256} className='max-h-64 m-auto' />
                                    : null}

                                <div className="space-y-4">
                                    <div key={`${set.name}-time`} className="grid grid-cols-5 py-3 items-center even:bg-gray-200 w-full px-10">
                                        <Label htmlFor={`${set.name}-time`} className="text-sm font-medium">Time</Label>
                                        <Input id={`${set.name}-time`} type="time" className="text-center" value={time} onChange={e => setTime(e.currentTarget.value)} />
                                    </div>
                                    {set.reportFields.map((field) => (
                                        <ReportDynamicInput field={field} set={set} key={`${set.name}-DynamicInput-${field.name}`} disabled={!time}
                                            onChange={v => onChangeHandler(set.name, field.name, v)}
                                        />
                                    ))}
                                </div>
                            </div>
                        </TabsContent>
                    ))}


                </Tabs>
            </div>
        </EmptyCard>
    )
}
