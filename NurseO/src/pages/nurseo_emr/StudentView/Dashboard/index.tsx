import { useContext } from 'react';
import Dashboard from '~/components/EMR/Dashboard/Dashboard';
import StudentViewPage from '../_StudentViewPage';
import { GlobalContext } from '~/services/State';


export default function DashboardPage() {
    const { patient } = useContext(GlobalContext)

    return (
        <StudentViewPage title='Dashboard'>
            <Dashboard patient={patient} className="grid-in-main" />
        </StudentViewPage>
    );
}
