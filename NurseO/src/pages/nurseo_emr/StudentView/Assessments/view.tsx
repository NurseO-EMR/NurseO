import ReportsViewer from '~/components/EMR/Reports/ReportsViewer';
import { ReportType } from "~/core/index";
import StudentViewPage from '../_StudentViewPage';

export default function AssessmentViewPage() {

    return (
        <StudentViewPage title='Report Viewer'>
            <ReportsViewer reportType={ReportType.studentAssessmentReport} title={"Assessment"} />
        </StudentViewPage>
    )
}