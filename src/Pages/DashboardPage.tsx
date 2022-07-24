import { $patient } from "./../Services/State"
import { Mar } from '../Components/Mar/Mar';
import { TopNav } from '../Nav/TopMenu/TopNav';


export default function DashboardPage() {


    return (
        <div>
            <TopNav />
            <Mar orders={$patient.value.medicationOrders} simTime={$patient.value.time} />
        </div>

    );
}
