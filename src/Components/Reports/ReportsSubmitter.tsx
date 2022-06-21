import { useState } from "react";
import { ReportType, ReportSet, StudentReport } from "nurse-o-core";
import { Button } from "../Form/Button";
import { Input } from "../Form/Input";
import { ReportTabs } from "./ReportTabs"
import { ReportsSubmitterTabContent } from "./ReportSubmitterTabContent";
import { findIndex } from "lodash";

type Props = {
    reportType: ReportType,
    title: string,
    reportSets: ReportSet[],
    onSave: (reports: StudentReport[]) => void
}

export default function ReportsSubmitter(props: Props) {


    const [selectedTab, setSelectedTab] = useState(0)
    const [note, setNote] = useState("")
    const [submittedReports, setSubmittedReports] = useState([] as StudentReport[])
    const [time, setTime] = useState("")
    const [date, setDate] = useState("");


    const onReportChangeHandler = (filedName: string, value: string) => {
        const temp: StudentReport = {
            setName: props.reportSets[selectedTab].name,
            vitalName: filedName,
            time: time,
            value: value,
            date: date,
            reportType: props.reportType
        }

        const similarReportIndex = findIndex(submittedReports, { date: temp.date, time: temp.time, vitalName: temp.vitalName, setName: temp.setName })
        if (similarReportIndex > -1) {
            submittedReports[similarReportIndex] = temp;
        } else {
            submittedReports.push(temp)
        }

        setSubmittedReports([...submittedReports])
    }


    const onSaveClickHandler = () => {
        props.onSave(submittedReports)
    }


    return (
        <div className="px-3.5 bg-gray w-[50rem] h-[26rem] overflow-auto">
            <ReportTabs onTabSelectionHandler={setSelectedTab} reportSets={props.reportSets?.map(report => report.name)}
                selectedTab={selectedTab} />
            <div className="flex gap-2">
                <Input label='Date' type="date" onChange={e => setDate(e.currentTarget.value)} value={date} optional/>
                <Input type="time" label="Time" onChange={(value) => setTime(value.currentTarget.value)} optional/>
            </div>
            {props.reportSets && props.reportSets[0] ?
                <ReportsSubmitterTabContent
                    onInputChangeHandler={onReportChangeHandler}
                    reportSet={props.reportSets[selectedTab]}
                    enabled={!!date && !!time}
                />
                : null}

            <div>
                <h1 className={"text-red text-xl font-bold"}>Nurse Note</h1>
                <textarea className={"w-full border-2 border-darkGray p-4"} rows={5}
                    spellCheck="true"
                    onChange={e => setNote(e.currentTarget.value)} value={note}></textarea>
            </div>

            <Button className="bg-red mb-2" onClick={onSaveClickHandler}>Add Report</Button>

        </div>
    );
}