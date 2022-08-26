import { $patient } from "./../Services/State"
import { Mar } from '../Components/Mar/Mar';
import { TopNav } from '../Nav/TopMenu/TopNav';
import { useEffect } from "react";
import TapOutService from "../Services/TapOutService";
import { Link } from "react-router-dom";


export default function DashboardPage() {

    useEffect(() => TapOutService.initialize(), [])



    return (
        <div className="overflow-x-hidden">
            <TopNav />
            <Mar orders={$patient.value.medicationOrders} simTime={$patient.value.time} />
            <div className="w-screen flex justify-center">
                <Link to="/AZListing">
                    <button className=" w-screen h-20 bg-red-700 text-xl text-white font-bold animate-pulse ">
                        Click here if you can&apos;t find your order/medication above</button></Link>

            </div>

        </div>

    );
}
