import StudentViewPage from "../_StudentViewPage"
import { ReportType } from "~/core"
import ReportSubmitter from '~/components/EMR/Reports/ReportsSubmitter';

export default function Report() {

    return (
        <StudentViewPage>
            <ReportSubmitter reportType={ReportType.studentAssessmentReport} className="grid-in-main" title="Assessment" viewPageURL="/nurseo_emr/StudentView/Assessments/view" />
        </StudentViewPage>
    )
}
