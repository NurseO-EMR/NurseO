import { useState, useEffect, useRef } from "react"
import { RefreshCw, Clock } from "lucide-react"
import { Button } from "~/components/common/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/components/common/ui/card"
import { Badge } from "~/components/common/ui/badge"
import { ScrollArea } from "~/components/common/ui/scroll-area"
import { Checkbox } from "~/components/common/ui/checkbox"
import { Avatar, AvatarFallback } from "~/components/common/ui/avatar"
import PageView from "../_PageView"

// Log entry type definition
type LogEntry = {
    id: string
    timestamp: Date
    message: string
    student: string
    reviewed: boolean
}

// Student type definition
type Student = {
    id: string
    name: string
}

// Generate a list of 15 students
const generateStudents = (): Student[] => {
    const firstNames = [
        "Emma",
        "Liam",
        "Olivia",
        "Noah",
        "Ava",
        "Ethan",
        "Sophia",
        "Mason",
        "Isabella",
        "Lucas",
        "Mia",
        "James",
        "Charlotte",
        "Benjamin",
        "Amelia",
    ]

    const lastNames = [
        "Smith",
        "Johnson",
        "Williams",
        "Brown",
        "Jones",
        "Garcia",
        "Miller",
        "Davis",
        "Rodriguez",
        "Martinez",
        "Hernandez",
        "Lopez",
        "Gonzalez",
        "Wilson",
        "Anderson",
    ]

    return Array.from({ length: 15 }, (_, i) => ({
        id: (i + 1).toString().padStart(2, "0"),
        name: `${firstNames[i]} ${lastNames[i]}`,
    }))
}

// Generate a random log message
const generateRandomLog = (student: Student): LogEntry => {
    return {
        id: "A",
        timestamp: new Date(),
        message: "aa",
        student: student.id,
        reviewed: false,
    }
}

// Get initials from name
const getInitials = (name: string) => {
    return name
        .split("")
        .map((part) => part[0])
        .join("")
        .toUpperCase()
}

export default function StudentMonitor() {
    // Generate 15 students
    const students = generateStudents()
    const [logs, setLogs] = useState<LogEntry[]>([])
    const [selectedStudent, setSelectedStudent] = useState<string>("all")
    const [isMonitoring, setIsMonitoring] = useState(true)
    const [activeView, setActiveView] = useState<"all" | "unreviewed" | "reviewed">("all")
    const [showHidden, setShowHidden] = useState(false)
    const [recentlyReviewed, setRecentlyReviewed] = useState<Record<string, number>>({})
    const timeoutsRef = useRef<Record<string, NodeJS.Timeout>>({})

    // Toggle log review status
    const toggleReviewStatus = (logId: string) => {
        //
    }

    // Clean up all timeouts when component unmounts
    useEffect(() => {
        return () => {
            Object.values(timeoutsRef.current).forEach((timeout) => {
                clearInterval(timeout)
            })
        }
    }, [])

    // Clear logs
    const handleClearLogs = () => {
        // Clear all timeouts
        Object.values(timeoutsRef.current).forEach((timeout) => {
            clearInterval(timeout)
        })
        timeoutsRef.current = {}

        setLogs([])
        setRecentlyReviewed({})
    }

    // Toggle monitoring
    const toggleMonitoring = () => {
        setIsMonitoring(!isMonitoring)
    }

    // Format timestamp
    const formatTime = (date: Date) => {
        return date.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: false,
        })
    }



    // Get student name by ID
    const getStudentName = (id: string) => {
        const student = students.find((s) => s.id === id)
        return student ? student.name : `Student ${id}`
    }

    // Get avatar color based on student ID
    const getAvatarColor = (id: string) => {
        const colors = [
            "bg-red-500",
            "bg-blue-500",
            "bg-green-500",
            "bg-yellow-500",
            "bg-purple-500",
            "bg-pink-500",
            "bg-indigo-500",
            "bg-teal-500",
            "bg-orange-500",
            "bg-cyan-500",
            "bg-lime-500",
            "bg-emerald-500",
            "bg-violet-500",
            "bg-fuchsia-500",
            "bg-rose-500",
        ]
        return colors[0]
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
                        <CardContent className=" h-[60vh] overflow-scroll">

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

                                {students.map((student) => (
                                    <div
                                        key={student.id}
                                        className={`flex items-center p-2 rounded-md cursor-pointer hover:bg-muted ${selectedStudent === student.id ? "bg-slate-100" : ""
                                            }`}
                                        onClick={() => setSelectedStudent(student.id)}
                                    >
                                        <div className="flex items-center space-x-3 w-full">
                                            <Avatar>
                                                <AvatarFallback className={getAvatarColor(student.id)}>
                                                    {getInitials(student.name)}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div className="flex-1">
                                                <p className="text-sm font-medium">{student.name}</p>
                                                <p className="text-xs text-slate-500 ">
                                                    ID: {student.id}
                                                </p>
                                            </div>
                                            <Badge>{logs.filter((log) => log.student === student.id).length}</Badge>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="lg:col-span-3">
                        <CardHeader className="flex flex-row items-center">
                            <div className="flex flex-col space-y-1.5">
                                <CardTitle> {selectedStudent === "all" ? "All Student Activities" : `Activities for ${getStudentName(selectedStudent)}`}</CardTitle>
                                <CardDescription>{isMonitoring ? "Monitoring in real-time" : "Monitoring paused"}</CardDescription>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-col space-y-4">
                                <div className="flex flex-col sm:flex-row gap-2 justify-between">
                                    <div className="ml-auto flex flex-wrap gap-2">
                                        <Button className={isMonitoring ? "bg-red" : "bg-green-700"} onClick={toggleMonitoring}>
                                            {isMonitoring ? "Pause" : "Resume"}
                                        </Button>
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
                                    {isMonitoring && (
                                        <div className="absolute right-0 top-0 animate-spin">
                                            <RefreshCw className="h-4 w-4 text-slate-500 " />
                                        </div>
                                    )}

                                    <ScrollArea className="h-[60vh] border border-slate-200 rounded-md bg-black/5">
                                        {filteredLogs.length > 0 ? (
                                            <div className="p-4 space-y-2">
                                                {filteredLogs.map((log) => {
                                                    const student = students.find((s) => s.id === log.student)
                                                    const isCountingDown = recentlyReviewed[log.id] !== undefined

                                                    return (
                                                        <div key={log.id} className={`p-3 border rounded-md transition-colors duration-300 
                                                            ${log.reviewed
                                                                ? isCountingDown
                                                                    ? "bg-green-100"
                                                                    : "bg-green-50 "
                                                                : "bg-white "
                                                            }`}
                                                        >
                                                            <div className="flex items-center justify-between">
                                                                <div className="flex items-center space-x-2">
                                                                    <Avatar className="h-8 w-8">
                                                                        <AvatarFallback className={getAvatarColor(log.student)}>
                                                                            {student ? getInitials(student.name) : log.student}
                                                                        </AvatarFallback>
                                                                    </Avatar>
                                                                    <div>
                                                                        <p className="text-sm font-medium">{student?.name ?? `Student ${log.student}`}</p>
                                                                        <div className="flex items-center text-xs text-slate-500 ">
                                                                            <Clock className="h-3 w-3 mr-1" />
                                                                            {formatTime(log.timestamp)}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="flex items-center">
                                                                    {isCountingDown && (
                                                                        <Badge variant="outline" className="mr-2 bg-green-100 ">Hiding in {recentlyReviewed[log.id]}s</Badge>
                                                                    )}
                                                                    <div className="flex items-center space-x-2">
                                                                        <Checkbox
                                                                            id={`review-${log.id}`}
                                                                            checked={log.reviewed}
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
                                            <div className="flex items-center justify-center h-full text-slate-500 ">
                                                {searchTerm ? "No matching logs found" : "No logs to display"}
                                            </div>
                                        )}
                                    </ScrollArea>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="text-xs text-slate-500 ">
                            Showing {filteredLogs.length} logs
                            {selectedStudent !== "all" ? ` for ${getStudentName(selectedStudent)}` : "across all students"}
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
