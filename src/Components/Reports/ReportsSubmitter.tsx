import { useState } from "react";
import { ReportType, ReportSet, StudentReport } from "nurse-o-core";
import { Button } from "../Form/Button";
import { Input } from "../Form/Input";
import {ReportTabs} from "./ReportTabs"
import { ReportsSubmitterTabContent } from "./ReportSubmitterTabContent";
import { findIndex} from "lodash";

type Props = {
    reportType: ReportType,
    title: string,
    reportSets: ReportSet[],
    onSave: (reports:StudentReport[])=>void
}

export default function ReportsSubmitter(props:Props) {

    
    const [selectedTab, setSelectedTab] = useState(0)
    const [note, setNote] = useState("")
    const [submittedReports, setSubmittedReports] = useState([] as StudentReport[])
    const [time, setTime] = useState([] as string[])
    const [date, setDate] = useState("");


    const onReportChangeHandler = (filedName: string, timeSlotIndex: number, value: string) => {
        const temp:StudentReport = {
            setName: props.reportSets[selectedTab].name,
            vitalName: filedName,
            time: time[timeSlotIndex],
            value: value,
            date: date,
            reportType: props.reportType
        }
        
        const similarReportIndex = findIndex(submittedReports, {date: temp.date, time: temp.time, vitalName: temp.vitalName, setName: temp.setName})
        if(similarReportIndex > -1) {
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
        <div className="px-3.5 bg-gray">
            <div className="flex justify-between px-8 pt-4">
                <Input label='Date' type="date" onChange={e=>setDate(e.currentTarget.value)} value={date}  />
                <Button className="bg-red p-10 w-min h-min" onClick={onSaveClickHandler}>Save</Button>
            </div>


            <ReportTabs onTabSelectionHandler={setSelectedTab} reportSets={props.reportSets?.map(report => report.name)}
                selectedTab={selectedTab} />


            {props.reportSets && props.reportSets[0] ?
                <ReportsSubmitterTabContent
                    numberOfTimeSlots={1}
                    onInputChangeHandler={onReportChangeHandler}
                    reportSet={props.reportSets[selectedTab]}
                    onTimeSlotChanges={setTime}
                />
                : null}

            <div>
                <h1 className={"text-red text-xl font-bold"}>Nurse Note</h1>
                <textarea className={"w-full border-2 border-red p-4"} rows={5}
                    spellCheck="true"
                    onChange={e=>setNote(e.currentTarget.value)} value={note}></textarea>
            </div>

        </div>
    );
}