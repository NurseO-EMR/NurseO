import { $patient, $providerOrdersAvailable } from "./../Services/State"
import { Mar } from '../Components/Mar/Mar';
import { TopNav } from '../Nav/TopMenu/TopNav';
import { useState } from "react";


export default function DashboardPage() {

    const [showProviderOrdersButton, setShowProviderOrdersButton] = useState(true)
    

    const onProviderOrders = () => {
        $providerOrdersAvailable.next(true)
        setShowProviderOrdersButton(false)
    }


    return (
        <div className="overflow-x-hidden">
            <TopNav />
            <Mar orders={$patient.value.medicationOrders} simTime={$patient.value.time} />
            <div className="w-screen flex justify-center">
                {showProviderOrdersButton ?
                    <button onClick={onProviderOrders} className=" w-screen h-20 bg-red-700 text-xl text-white font-bold animate-pulse ">
                        Click Here if you received provider orders</button> : null
                }

            </div>

        </div>

    );
}
