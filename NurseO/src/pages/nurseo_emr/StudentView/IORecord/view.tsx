
import ReportsViewer from '~/components/EMR/Reports/ReportsViewer';
import { ReportType } from "~/core/index";
import StudentViewPage from '../_StudentViewPage';

export default function IORecordViewPage() {

    return (
        <StudentViewPage title='IO Reports Viewer'>
            <ReportsViewer reportType={ReportType.studentIOReport} title={"I/O"} />
        </StudentViewPage>
    );
}
