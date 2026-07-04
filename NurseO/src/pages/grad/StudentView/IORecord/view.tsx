
import ReportsViewer from '~/components/EMR/Reports/ReportsViewer';
import { ReportType } from "~/core/index";
import StudentViewPage from '../_StudentViewPage';

export default function IORecordViewPage() {

    return (
        <StudentViewPage >
            <ReportsViewer reportType={ReportType.studentIOReport} title={"I/O"} />
        </StudentViewPage>
    );
}
