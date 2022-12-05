import { faBedPulse, faBong, faComputer, faDroplet } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { filter } from "lodash";
import { PatientChart, ReportSet, ReportType, StudentReport } from "nurse-o-core";
import { useEffect, useState } from "react";
import ReportsSubmitter from "../../Components/Reports/ReportsSubmitter";
import { BaseStageProps, BaseStage } from "../../Components/Stages/BaseStage"
import { ChartPreviewer } from "../../Components/Reports/Viewer/ChartPreviewer";
import { Database } from "../../Services/Database";

export type Props = BaseStageProps & {
    onNext: (studentReports: StudentReport[]) => void,
    patient?:PatientChart
}

export function ChartingStage(props: Props) {

    const [allReports, setAllReports] = useState([] as ReportSet[])
    const [reportSets, setReportSets] = useState([] as ReportSet[])
    const [studentReports, setStudentReports] = useState(props.patient?.studentReports || [] as StudentReport[])
    const [activeReportSet, setActiveReportSet] = useState(0)
    const [reportType, setReportType] = useState<ReportType>("studentVitalsReport")
    const [hoveringOnArrayPreviewer, setHoveringOnArrayPreviewer] = useState(false)

    console.log(studentReports)


    useEffect(() => {
        const db = Database.getInstance();
        db.getSettings().then(v => {
            setAllReports(v.reportSet)
            const firstReport = filter(allReports, {type:reportType});
            setReportSets(firstReport);
        })
    }, [allReports, reportType])


    const onNextClickHandler = () => {
        props.onNext(studentReports)
    }

    const onReportSetChangeHandler= (reportSetIndex:number)=>{
        setActiveReportSet(reportSetIndex);
        let tempReportType:ReportType = "studentVitalsReport"
        switch(reportSetIndex) {
            case 0:  tempReportType = "studentVitalsReport"; break;
            case 1:  tempReportType = "studentAssessmentReport"; break;
            case 2:  tempReportType = "studentIOReport"; break;
            default: tempReportType = "studentVitalsReport"; break;
        }

        const reports = filter(allReports, {type:tempReportType});
        setReportType(tempReportType)
        setReportSets([...reports]);
    }

    const onDeleteClickHandler = (index:number)=>{
        studentReports.splice(index, 1)
        setStudentReports([...studentReports])
    }

    return (
        <div className="overflow-hidden relative">
            <BaseStage {...props} onNext={onNextClickHandler} title="Charting" icon={faComputer} moveLeft={studentReports.length > 0} customIconNTitle>
                <div className="flex justify-around text-darkGray">
                    <div className={"cursor-pointer " + (activeReportSet === 0 ? "text-blue" : null)} onClick={()=>onReportSetChangeHandler(0)}>
                        <FontAwesomeIcon icon={faBedPulse} className="text-3xl text-center" />
                        <h1 className="font-bold mt-4">Vitals</h1>
                    </div>
                    <div className={"cursor-pointer " + (activeReportSet === 1 ? "text-blue" : null)} onClick={()=>onReportSetChangeHandler(1)}>
                        <FontAwesomeIcon icon={faBong} className="text-3xl text-center" />
                        <h1 className="font-bold mt-4">Assessment</h1>
                    </div>
                    <div className={"cursor-pointer " + (activeReportSet === 2 ? "text-blue" : null)} onClick={()=>onReportSetChangeHandler(2)}>
                        <FontAwesomeIcon icon={faDroplet} className="text-3xl text-center" />
                        <h1 className="font-bold mt-4">I/O Record</h1>
                    </div>
                </div>
                <ReportsSubmitter reportType={reportType} reportSets={reportSets} 
                studentReports={studentReports} onSave={setStudentReports} />
            </BaseStage>

            <ChartPreviewer show={studentReports.length > 0} studentReports={studentReports}/>

        </div>
    )

}