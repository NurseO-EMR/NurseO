import { useState } from "react"
import { Button } from "~/components/common/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "~/components/common/ui/card"
import { Checkbox } from "~/components/common/ui/checkbox"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "~/components/common/ui/table"
import PageView from "../_PageView"
import { api } from "~/utils/api"


export default function LiveMonitorPage() {
    const [selectedPairings, setSelectedPairings] = useState<number[]>([])
    const studentPatientCharts = api.admin.getListOfStudentPatients.useQuery()

    const handleSelection = (pairingId: number) => {
        setSelectedPairings((prev) =>
            prev.includes(pairingId) ? prev.filter((id) => id !== pairingId) : [...prev, pairingId],
        )
    }

    const handleSubmit = () => {
        //
    }

    const selectAll = () => {
        if (!studentPatientCharts.data) return
        setSelectedPairings(studentPatientCharts.data.map((s) => s.patientId))
    }

    const clearAll = () => {
        setSelectedPairings([])
    }

    return (
        <PageView>
            <Card className="w-[50vw] h-[78vh] my-auto overflow-scroll shadow-sm">
                <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                        <CardTitle className="text-xl">EMR Student-Patient Monitoring</CardTitle>
                        <div className="flex gap-2">
                            <Button variant="outline" size="sm" onClick={selectAll}>
                                Select All
                            </Button>
                            <Button variant="outline" size="sm" onClick={clearAll}>
                                Clear All
                            </Button>
                            <Button size="sm" onClick={handleSubmit} disabled={selectedPairings.length === 0}>
                                Submit ({selectedPairings.length})
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
                                <TableHead>Patient Name</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {studentPatientCharts.data?.map((s) => (
                                <TableRow
                                    key={s.patientId}
                                    className="cursor-pointer"
                                    onClick={() => handleSelection(s.patientId)}
                                >
                                    <TableCell>
                                        <Checkbox
                                            id={`pair-${s.patientId}`}
                                            checked={selectedPairings.includes(s.patientId)}
                                            onCheckedChange={() => handleSelection(s.patientId)}
                                            aria-label={`Select ${s.studentName} with patient ${s.patientName}`}
                                        />
                                    </TableCell>
                                    <TableCell className="font-medium">{s.studentName}</TableCell>
                                    <TableCell>{s.patientName}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </PageView>
    )
}
