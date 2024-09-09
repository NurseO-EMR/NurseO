import { useContext, useMemo, useState } from 'react';
import type { ReportType } from "@nurse-o-core/index";
import EmptyCard from '../Dashboard/Card/EmptyCard';
import ReportTabs from './ReportTabs';
import { GlobalContext } from '~/services/State';

type Props = {
    className?: string,
    title: string,
    reportType: ReportType
}


export default function ReportsViewer(props: Props) {

    const { patient } = useContext(GlobalContext)
    const studentReports = patient.studentReports
    const setNames = useMemo(() => [...new Set(studentReports?.filter(s => s.reportType === props.reportType).map(s => s.setName))], [props.reportType, studentReports])
    const [selectedTabIndex, setSelectedTabIndex] = useState(0)
    const filteredReports = useMemo(() => studentReports?.filter(s => s.setName === setNames[selectedTabIndex] && s.reportType === props.reportType), [props.reportType, selectedTabIndex, setNames, studentReports])
    const times = useMemo(() => [...new Set(filteredReports?.map(s => s.time))], [filteredReports]) // TODO: figure out how to arrange these

    const getMap = () => {
        const map = new Map<string, string[]>()
        if (!filteredReports) return map

        for (const report of filteredReports) {
            const timeIndex = times.findIndex(t => t === report.time)
            if (map.has(report.fieldName)) {
                map.get(report.fieldName)![timeIndex] = report.value // checked above; no need to reset since this is a memory pointer
            } else {
                const array = new Array(times.length).fill("-") as string[]
                array[timeIndex] = report.value
                map.set(report.fieldName, array)
            }
        }

        return map
    }

    const getRows = () => {
        const map = getMap()
        const jsx: JSX.Element[] = []
        for (const [k, v] of map.entries()) {
            const row = (
                <tr className="odd:bg-gray-100 even:bg-gray-300 h-14">
                    <td>{k}</td>
                    {v.map((d, i) => <td key={k + i}>{d}</td>)}
                </tr>
            )
            jsx.push(row)
        }

        return jsx
    }

    return (
        <div className={props.className}>
            <EmptyCard title={props.title}>
                <ReportTabs selectedTab={selectedTabIndex} onTabSelectionHandler={setSelectedTabIndex} reportSets={setNames} />

                {filteredReports && filteredReports.length > 0 ?
                    <table className="w-full table-auto text-center">
                        <thead>
                            <tr className="">
                                <th key={-1}>{props.title}</th>
                                {times.map((time, i) =>
                                    <th key={i}>{time}</th>
                                )}
                            </tr>
                        </thead>
                        <tbody>
                            {getRows()}
                        </tbody>
                    </table>
                    : <h1 className='font-bold text-center pt-5 pb-4'>No Data Available</h1>}
                {/* {this.props.showNotes ? this.getNotes(this.state.selectedTab) : null} */}

            </EmptyCard>
        </div>

    );
}
