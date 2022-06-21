import { faComputer } from "@fortawesome/free-solid-svg-icons";
import { ReportSet, StudentReport } from "nurse-o-core";
import { useEffect, useState } from "react";
import ReportsSubmitter from "../../Components/Reports/ReportsSubmitter";
import { ArrayPreviewer } from "../../Components/Stages/ArrayPreviewer";
import { BaseStageProps, BaseStage } from "../../Components/Stages/BaseStage"
import { Td } from "../../Components/Table/Td";
import { Tr } from "../../Components/Table/Tr";
import { Database } from "../../Services/Database";

export type Props = BaseStageProps & {
    onNext: (studentReports: StudentReport[]) => void,
}

export function ChartingStage(props: Props) {


    const [reportSets, setReportSets] = useState([] as ReportSet[])
    const [studentReports, setStudentReports] = useState([] as StudentReport[])


    useEffect(() => {
        const db = Database.getInstance();
        db.getSettings().then(v => {
            setReportSets(v.reportSet)
        })
    }, [])


    const onNextClickHandler = () => {
        props.onNext(studentReports)
    }


    return (
        <div className="overflow-hidden relative">
            <BaseStage {...props} onNext={onNextClickHandler} title="Charting" icon={faComputer} moveLeft={studentReports.length > 0}>
                <ReportsSubmitter reportType="studentAssessmentReport" title="Assessment" reportSets={reportSets} onSave={setStudentReports} />
            </BaseStage>

            <ArrayPreviewer headerItems={["Date", "Time", "Set Name", "Field", "Value"]} show={studentReports.length > 0} title="Added History">
                {studentReports.map((r,i)=>
                    <Tr key={i}>
                        <Td>{r.date}</Td>
                        <Td>{r.time}</Td>
                        <Td>{r.setName}</Td>
                        <Td>{r.vitalName}</Td>
                        <Td>{r.value}</Td>
                    </Tr>
                )}
            </ArrayPreviewer>

        </div>
    )

}