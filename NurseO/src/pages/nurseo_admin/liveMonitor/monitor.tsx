import { useState, useEffect, useMemo } from "react"
import { RefreshCw, Clock } from "lucide-react"
import { Button } from "~/components/common/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/components/common/ui/card"
import { Badge } from "~/components/common/ui/badge"
import { ScrollArea } from "~/components/common/ui/scroll-area"
import { Checkbox } from "~/components/common/ui/checkbox"
import { Avatar, AvatarFallback } from "~/components/common/ui/avatar"
import PageView from "../_PageView"
import { api } from "~/utils/api"
import Image from "next/image"
import { Announcement, broadcastAnnouncement } from "~/services/AnnouncementService"
import { useSearchParams } from "next/navigation"

type LogEntry = {
    id: number
    timestamp: Date
    message: string
    studentName: string
    studentEmail: string
    reviewed: boolean
}


export default function StudentMonitor() {
    const searchParams = useSearchParams()
    const studentUIDs = useMemo(() => searchParams.get("studentIds")?.split(",") ?? [], [searchParams])
    const [selectedStudent, setSelectedStudent] = useState<string>("all")
    const [showHidden, setShowHidden] = useState(false)
    const [logs, setLogs] = useState<LogEntry[]>([])

    const students = api.admin.getStudentInfoFromUIDs.useQuery({ studentUIDs: studentUIDs })
    const studentPatientsLogs = api.admin.getLogsForSpecificStudents.useMutation()

    const hiddenLogsCount = useMemo(() => logs.filter(l => l.reviewed).length, [logs])



    useEffect(() => {
        const lastDate = logs.length === 0 ? new Date(new Date().toDateString()) : logs[logs.length - 1]!.timestamp
        const interval = setInterval(() => {
            if (studentUIDs.length === 0) { broadcastAnnouncement("Missing Student UIDs", Announcement.error); return }
            studentPatientsLogs.mutateAsync({ studentUIDs: studentUIDs, dateTimeMarker: lastDate }).then(r => {
                if (!r.data) return
                const newLogs = r.data.map(d => ({
                    id: d.logId,
                    message: d.activity,
                    studentName: d.name,
                    studentEmail: d.email,
                    timestamp: d.timestamp,
                    reviewed: false
                } as LogEntry))

                setLogs([...logs, ...newLogs])
            }).catch(e => broadcastAnnouncement(String(e), Announcement.error))
        }, 5000)
        return () => clearInterval(interval)
    }, [logs, studentPatientsLogs, studentUIDs])


    const toggleReviewStatus = (logId: number) => {
        logs.find(l => l.id === logId)!.reviewed = true
        setLogs([...logs])
    }


    const handleClearLogs = () => {
        logs.map(l => l.reviewed = true)
        setLogs([...logs])
    }

    return (
        <PageView>

            <div className="container mx-auto my-auto grid gap-10">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    <Card className="lg:col-span-1">
                        <CardHeader>
                            <CardTitle>Students</CardTitle>
                            <CardDescription>Select a student to view their logs</CardDescription>
                        </CardHeader>
                        <CardContent className=" h-[50vh] overflow-scroll">

                            <div className="space-y-2">
                                <div
                                    key="all"
                                    className={`flex items-center p-2 rounded-md cursor-pointer hover:bg-muted ${selectedStudent === "all" ? "bg-slate-100" : ""
                                        }`}
                                    onClick={() => setSelectedStudent("all")}
                                >
                                    <div className="flex items-center space-x-3 w-full">
                                        <Avatar>
                                            <AvatarFallback className="bg-gray-500">ALL</AvatarFallback>
                                        </Avatar>
                                        <div className="flex-1">
                                            <p className="text-sm font-medium">All Students</p>
                                            <p className="text-xs text-slate-500 ">{logs.length} total logs</p>
                                        </div>
                                    </div>
                                </div>

                                {students.data?.data?.map((student) => (
                                    <div key={student.id}
                                        className={`flex items-center p-2 rounded-md cursor-pointer hover:bg-muted ${selectedStudent === student.id ? "bg-slate-100" : ""}`}
                                        onClick={() => setSelectedStudent(student.id)}>
                                        <div className="flex items-center space-x-3 w-full">
                                            <Avatar>
                                                <AvatarFallback>
                                                    <Image src={student.image} alt={`Photo of ${student.name}`} width={50} height={50} />
                                                </AvatarFallback>
                                            </Avatar>
                                            <div className="flex-1">
                                                <p className="text-sm font-medium">{student.name}</p>
                                                <p className="text-xs text-slate-500 ">
                                                    Email: {student.email}
                                                </p>
                                            </div>
                                            <Badge>{logs.filter((log) => log.studentEmail === student.email).length}</Badge>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="lg:col-span-3">
                        <CardHeader className="flex flex-row items-center">
                            <div className="flex flex-col space-y-1.5">
                                <CardTitle> {selectedStudent === "all" ? "All Student Activities" : `Activities for ${students.data?.data?.find(s => s.id === selectedStudent)?.name}`}</CardTitle>
                                <CardDescription>Monitoring in real time</CardDescription>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-col space-y-4">
                                <div className="flex flex-col sm:flex-row gap-2 justify-between">
                                    <div className="ml-auto flex flex-wrap gap-2">
                                        <Button onClick={handleClearLogs}>Clear logs</Button>
                                    </div>
                                    <div className="flex gap-2 items-center">
                                        <Button variant="outline" onClick={() => setShowHidden(!showHidden)} >
                                            {showHidden ? "Hide Reviewed" : "Show Hidden"}
                                            {!showHidden && hiddenLogsCount > 0 && (<Badge variant="secondary" className="ml-2">{hiddenLogsCount}</Badge>)}
                                        </Button>
                                    </div>
                                </div>

                                <div className="relative">

                                    <div className="absolute left-0 -top-10 animate-spin">
                                        <RefreshCw className="h-4 w-4 text-slate-500 " />
                                    </div>


                                    <ScrollArea className="h-[50vh] border border-slate-200 rounded-md bg-black/5">
                                        {logs.length > 0 ? (
                                            <div className="p-4 space-y-2">
                                                {(showHidden ? logs.filter(l => l.reviewed) : logs.filter(l => !l.reviewed)).map((log) => {
                                                    const student = students.data?.data?.find((s) => s.email === log.studentEmail)

                                                    return (
                                                        <div key={log.id} className={`p-3 border rounded-md transition-colors duration-300 
                                                            ${log.reviewed ? "bg-green-50 " : "bg-white "}`}
                                                        >
                                                            <div className="flex items-center justify-between">
                                                                <div className="flex items-center space-x-2">
                                                                    <Avatar className="h-8 w-8">
                                                                        <AvatarFallback>
                                                                            {student && <Image src={student.image} alt={`Photo of ${student.name}`} width={50} height={50} />}
                                                                        </AvatarFallback>
                                                                    </Avatar>
                                                                    <div>
                                                                        <p className="text-sm font-medium">{student?.name ?? `Student ${log.studentName}`}</p>
                                                                        <div className="flex items-center text-xs text-slate-500 ">
                                                                            <Clock className="h-3 w-3 mr-1" />
                                                                            {formatTime(log.timestamp)}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="flex items-center">
                                                                    <div className="flex items-center space-x-2">
                                                                        <Checkbox
                                                                            id={`review-${log.id}`}
                                                                            checked={log.reviewed}
                                                                            disabled={log.reviewed}
                                                                            onCheckedChange={() => toggleReviewStatus(log.id)}
                                                                        />
                                                                        <label
                                                                            htmlFor={`review-${log.id}`}
                                                                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                                        >Reviewed</label>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="mt-2 text-sm">{log.message}</div>
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                        ) : (
                                            <div className="flex items-center justify-center h-full text-slate-500 ">No logs to display</div>
                                        )}
                                    </ScrollArea>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="text-xs text-slate-500 ">
                            Showing {logs.length} logs
                            {selectedStudent !== "all" ? ` for ${students.data?.data?.find(s => s.id === selectedStudent)?.name}` : "across all students"}
                            {!showHidden && hiddenLogsCount > 0 && (
                                <span className="ml-1">
                                    ({hiddenLogsCount} reviewed logs hidden -{""}
                                    <button onClick={() => setShowHidden(true)} className="text-slate-900 hover:underline ">
                                        show
                                    </button>
                                    )
                                </span>
                            )}
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </PageView>
    )
}



function formatTime(date: Date) {
    return date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
    })
}
