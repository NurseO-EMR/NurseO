import { faBedPulse, faBong, faComputer, faDroplet } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { filter } from "lodash";
import { type PatientChart, type ReportSet, ReportType, type StudentReport } from "@nurse-o-core/index";
import { useEffect, useState } from "react";
import { type BaseStageProps, BaseStage } from "~/components/Stages/BaseStage"
import { ChartPreviewer } from "~/components/Reports/ChartPreviewer";
import { ReportDynamicTable } from "~/components/Reports/ReportDynamicTable";
import { ReportTabs } from "~/components/Reports/ReportTabs";
import { api } from "~/utils/api";

export type Props = BaseStageProps & {
    onNext: (studentReports: StudentReport[]) => void,
    patient?: PatientChart
}

export function ChartingStage(props: Props) {
    const {data: allReports} = api.report.getReportSets.useQuery()
    const [reportSets, setReportSets] = useState([] as ReportSet[])
    const [studentReports, setStudentReports] = useState(props.patient?.studentReports ?? [] as StudentReport[])
    const [activeReportSet, setActiveReportSet] = useState(0)
    const [reportType, setReportType] = useState<ReportType>(ReportType.studentVitalsReport)
    const [selectedTab, setSelectedTab] = useState(0)

    useEffect(()=>{
        if(!allReports) return;
        onReportSetChangeHandler(0)
    }, [allReports])
    
    const onNextClickHandler = () => {
        props.onNext(studentReports)
    }

    const onReportSetChangeHandler = (reportSetIndex: number) => {
        setActiveReportSet(reportSetIndex);
        const reportType = getReportTypeFromIndex(reportSetIndex)
        // filter(allReports, { type: reportType });
        const reports =  allReports?.filter(a=>a.type === reportType) ?? []
        setReportType(reportType)
        setReportSets([...reports]);
    }

    const onReportsSaveClickHandler = (updatedReports: StudentReport[]) => {
        if (updatedReports.length > 0 && updatedReports[0]) {
            const { setName } = updatedReports[0]
            //remove the current version of the reports
            const filtered = studentReports.filter(r => r.setName !== setName)
            // add the new reports
            const output = [...filtered, ...updatedReports]
            setStudentReports(output)
        }
    }

    return (
        <div className="overflow-hidden relative">
            <BaseStage {...props} onNext={onNextClickHandler} title="Charting" icon={faComputer} customIconNTitle moveLeft={studentReports.length>0}>
                <div className="flex justify-around text-darkGray">
                    <div className={"cursor-pointer " + (activeReportSet === 0 ? "text-blue" : null)} onClick={() => onReportSetChangeHandler(0)}>
                        <FontAwesomeIcon icon={faBedPulse} className="text-3xl text-center" />
                        <h1 className="font-bold mt-4">Vitals</h1>
                    </div>
                    <div className={"cursor-pointer " + (activeReportSet === 1 ? "text-blue" : null)} onClick={() => onReportSetChangeHandler(1)}>
                        <FontAwesomeIcon icon={faBong} className="text-3xl text-center" />
                        <h1 className="font-bold mt-4">Assessment</h1>
                    </div>
                    <div className={"cursor-pointer " + (activeReportSet === 2 ? "text-blue" : null)} onClick={() => onReportSetChangeHandler(2)}>
                        <FontAwesomeIcon icon={faDroplet} className="text-3xl text-center" />
                        <h1 className="font-bold mt-4">I/O Record</h1>
                    </div>
                </div>

                {reportSets && reportSets.length > 0 && selectedTab < reportSets.length ?
                    <>
                        <ReportTabs onTabSelectionHandler={setSelectedTab} reportSets={reportSets.map(report => report.name)}
                            selectedTab={selectedTab} />
                        <ReportDynamicTable onSave={onReportsSaveClickHandler}
                            studentReports={props.patient?.studentReports}
                            options={reportSets[selectedTab]!.reportFields}
                            type={reportType} setName={reportSets[selectedTab]!.name} />
                    </>
                    : <h1>Loading...</h1>}
            </BaseStage>


            <ChartPreviewer studentReports={studentReports} />

        </div>
    )
 
}


function getReportTypeFromIndex(reportSetIndex: number) {
    let tempReportType: ReportType = ReportType.studentVitalsReport
    switch (reportSetIndex) {
        case 0: tempReportType = ReportType.studentVitalsReport; break;
        case 1: tempReportType = ReportType.studentAssessmentReport; break;
        case 2: tempReportType = ReportType.studentIOReport; break;
        default: tempReportType = ReportType.studentVitalsReport; break;
    }

    return tempReportType;
}