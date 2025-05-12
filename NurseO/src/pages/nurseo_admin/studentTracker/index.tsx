import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/common/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "~/components/common/ui/table"
import { Button } from "~/components/common/ui/button"
import PageView from "../_PageView"
import { api } from "~/utils/api"
import Link from "next/link"

export default function StudentTrackingTable() {
    const studentPatients = api.admin.getListOfStudentPatients.useQuery()


    return (
        <PageView>
            <Card className="h-[78vh] my-auto w-[50vw] overflow-scroll">
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
                                    <TableCell>{r.startDateTime?.toLocaleString()}</TableCell>
                                    <TableCell className="text-right">
                                        <Link href={"/nurseo_admin/preview/" + r.patientId} target="_blank"><Button size="sm">Open Chart</Button></Link>
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
