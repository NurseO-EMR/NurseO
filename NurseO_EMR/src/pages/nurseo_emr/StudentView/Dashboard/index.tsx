import { useContext } from 'react';
import Dashboard from '~/Components/EMR/Dashboard/Dashboard';
import StudentViewPage from '../_StudentViewPage';
import { GlobalContext } from '~/Services/State';


export default function DashboardPage() {
    const { patient } = useContext(GlobalContext)

    return (
        <StudentViewPage>
            <Dashboard patient={patient} className="grid-in-main" />
        </StudentViewPage>
    );
}
