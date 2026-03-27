import { useContext, useMemo } from 'react';
import type { PatientChart, ReportType, StudentReport } from "~/core/index";
import EmptyCard from '../Dashboard/Card/EmptyCard';
import { GlobalContext } from '~/services/State';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/components/common/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '~/components/common/ui/table';

type Props = {
    className?: string,
    title: string,
    reportType: ReportType
    patient?: PatientChart
}


export default function ReportsViewer(props: Props) {
    const { patient: patientContext } = useContext(GlobalContext)
    const studentReports = patientContext.studentReports
    const sets = useMemo(() => [...new Set(studentReports?.filter(s => s.reportType === props.reportType))], [props.reportType, studentReports])
    const setNames = useMemo(() => [...new Set(sets.map(s => s.setName))], [sets])

    if (sets.length === 0) {
        return <EmptyCard title={props.title}><p className='p-10 text-center'>No Data Available</p></EmptyCard>
    }

    return (
        <div className={props.className}>
            <EmptyCard title={props.title}>
                <Tabs defaultValue={sets[0]?.setName} className="w-full">
                    <TabsList className="grid w-full grid-cols-5 lg:grid-cols-10 h-auto" role="tablist">
                        {setNames.map((name) => (
                            <TabsTrigger key={name} value={name} role="tab" aria-controls={`${name}-panel`} className="text-xs p-2">{name}</TabsTrigger>
                        ))}
                    </TabsList>
                    {setNames.map(s => {
                        const filteredReports = studentReports.filter(r => r.setName === s)
                        return (
                            <TabsContent value={s} key={s}>
                                <ReportViewerTable studentReports={filteredReports} key={s} />
                            </TabsContent>
                        )
                    })}

                </Tabs>
            </EmptyCard>
        </div>

    );
}


function ReportViewerTable(props: { studentReports: StudentReport[] }) {

    const reportsGrid = getReportsGrid(props.studentReports)
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    {reportsGrid[0]!.map(cell => <TableHead className='cursor-default' key={cell}>{cell}</TableHead>)}
                </TableRow>
            </TableHeader>

            <TableBody>
                {reportsGrid.slice(1).map((row, i) => {
                    return (
                        <TableRow key={i}>
                            {row.map(cell => <TableCell className='cursor-default' key={cell}>{cell}</TableCell>)}
                        </TableRow>
                    )
                })}
            </TableBody>
        </Table>
    )
}


function getReportsGrid(studentReports: StudentReport[]) {
    const grid: string[][] = []

    // building the top row for the time
    const timeSet = new Set(["Value/Time"])
    for (const report of studentReports) {
        const { date, time } = report
        timeSet.add(`${date} ${time}`)
    }

    grid.push([...timeSet])

    // building every row below it
    for (let i = 0; i < studentReports.length; i++) {
        const { fieldName, date, time, value } = studentReports[i]!
        if (value.length === 0) continue

        const timeArray = grid[0]!
        let rowArrayIndex = grid.findIndex(row => row[0] === fieldName)

        if (rowArrayIndex === -1) { // if row array doesn't exist 
            const rowArray = new Array<string>(timeArray.length)
            rowArray.fill("")

            rowArray[0] = fieldName

            grid.push(rowArray)
            rowArrayIndex = grid.length - 1
        }

        const timeIndex = timeArray.indexOf(`${date} ${time}`) // trying to figure out which column belongs to that specific time
        grid[rowArrayIndex]![timeIndex] = value

    }

    return grid
}
