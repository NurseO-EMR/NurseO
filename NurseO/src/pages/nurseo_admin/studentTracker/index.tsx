import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/common/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "~/components/common/ui/table"
import { Button } from "~/components/common/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "~/components/common/ui/tooltip"
import PageView from "../_PageView"
import { api } from "~/utils/api"

export default function StudentTrackingTable() {
    const studentPatients = api.admin.getListOfStudentPatients.useQuery()


    return (
        <PageView>
            <Card className="h-78/100 my-auto">
                <CardHeader>
                    <CardTitle>Student Progress Tracker</CardTitle>
                    <CardDescription>List of students who have submitted their findings using NurseO</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[180px]">Student Name</TableHead>
                                <TableHead className="w-[200px]">Assigned Patient</TableHead>
                                <TableHead className="w-[120px]">Start Date</TableHead>
                                <TableHead>Last Activity</TableHead>
                                <TableHead className="w-[100px] text-center">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {studentPatients.data?.map((r) => (
                                <TableRow key={r.patientId}>
                                    <TableCell className="font-medium">{r.studentName}</TableCell>
                                    <TableCell>
                                        {r.patientName}
                                        <div className="text-xs opacity-70">{r.patientBarCode}</div>
                                    </TableCell>
                                    <TableCell>{ }</TableCell>
                                    <TableCell>
                                        <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <div className="max-w-md">{truncateText("")}</div>
                                                </TooltipTrigger>
                                                <TooltipContent className="max-w-md p-4">
                                                    <p>{""}</p>
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Button onClick={() => console.log} size="sm">Open Chart</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

        </PageView>
    )
}


function truncateText(text: string, maxLength = 60) {
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text
}
