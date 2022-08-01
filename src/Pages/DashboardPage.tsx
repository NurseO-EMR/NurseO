import { $patient } from "./../Services/State"
import { Mar } from '../Components/Mar/Mar';
import { TopNav } from '../Nav/TopMenu/TopNav';


export default function DashboardPage() {


    return (
        <div>
            <TopNav />
            <Mar orders={$patient.value.medicationOrders} simTime={$patient.value.time} />
            <div className="w-screen flex justify-center">
                <button className="absolute bottom-10 w-screen h-20 bg-red-700 text-xl text-white font-bold animate-pulse ">
                    Click Here if you received provider orders</button>
            </div>
            
        </div>

    );
}
