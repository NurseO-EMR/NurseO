import { ReportSet } from "nurse-o-core";
import { useEffect, useState } from "react";
import ReportsSubmitter from "../Components/Reports/ReportsSubmitter";
import { Database } from "../Services/Database";
import PageView from "./PageView";

export default function DashboardPage() {

    const [reportSets, setReportSets] = useState([] as ReportSet[])


    useEffect(()=>{
        const db = Database.getInstance();
        db.getSettings().then(v=>{
            setReportSets(v.reportSet)
        })
    }, [])


    return (
        <PageView>
            <ReportsSubmitter reportType="studentAssessmentReport" title="Assessment" reportSets={reportSets} onSave={console.log} />
        </PageView>
    );
}