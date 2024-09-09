import ReportsViewer from '~/Components/EMR/Reports/ReportsViewer';
import StudentViewPage from '../_StudentViewPage';
import { ReportType } from '@nurse-o-core/index';

export default function VitalsViewPage() {
    return (
        <StudentViewPage>
            <ReportsViewer reportType={ReportType.studentVitalsReport} title={"Vitals"} />
        </StudentViewPage>

    );
}	
