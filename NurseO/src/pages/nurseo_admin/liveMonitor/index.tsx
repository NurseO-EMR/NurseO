import { useState } from "react"
import { Button } from "~/components/common/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "~/components/common/ui/card"
import { Checkbox } from "~/components/common/ui/checkbox"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "~/components/common/ui/table"
import PageView from "../_PageView"
import { api } from "~/utils/api"
import { useRouter } from "next/router"


export default function LiveMonitorPage() {
    const [selectedStudents, setSelectedStudents] = useState<string[]>([])
    const studentPatientCharts = api.admin.getListOfStudents.useQuery()
    const router = useRouter()
    const handleSelection = (id: string) => {
        const studentIndex = selectedStudents.indexOf(id)
        if (studentIndex > -1) {
            selectedStudents.splice(studentIndex, 1)
        } else {
            selectedStudents.push(id)
        }
        setSelectedStudents([...selectedStudents])
    }

    const handleSubmit = async () => {
        await router.push("/nurseo_admin/liveMonitor/monitor?studentIds=" + selectedStudents.toString())
    }


    return (
        <PageView>
            <Card className="w-[50vw] h-[78vh] my-auto overflow-scroll shadow-sm">
                <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                        <CardTitle className="text-xl">EMR Student-Patient Monitoring</CardTitle>
                        <div className="flex gap-2">
                            <Button size="sm" onClick={handleSubmit} disabled={selectedStudents.length === 0}>
                                Submit ({selectedStudents.length})
                            </Button>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[50px]">
                                    <span className="sr-only">Select</span>
                                </TableHead>
                                <TableHead>Student Name</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {studentPatientCharts.data?.map((s) => (
                                <TableRow
                                    key={s.id}
                                    className="cursor-pointer"
                                    onClick={() => handleSelection(s.id)}
                                >
                                    <TableCell>
                                        <Checkbox
                                            className="ring-1 ring-white"
                                            id={`pair-${s.id}`}
                                            checked={selectedStudents.includes(s.id)}
                                            onCheckedChange={() => handleSelection(s.id)}
                                        />
                                    </TableCell>
                                    <TableCell className="font-medium">{s.name}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </PageView>
    )
}
