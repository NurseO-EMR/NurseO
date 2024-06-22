import { $patient } from "./../Services/State"
import { Mar } from '../Components/Mar/Mar';
import { TopNav } from '../Nav/TopMenu/TopNav';
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";


export default function DashboardPage() {
    const nav = useNavigate();
    const [patient, setPatient] = useState($patient.value)

    useEffect(() =>{
        const auth = getAuth();
        if(!auth.currentUser) nav("/")
    },[nav])


    useEffect(()=>{
        const sub = $patient.subscribe(setPatient)
        return sub.unsubscribe()
    },[])



    return (
        <div className="overflow-x-hidden">
            <TopNav />
            <Mar orders={patient.medicationOrders} simTime={patient.time} />
            <div className="w-screen flex justify-center">
                <Link to="/AZListing">
                    <button className=" w-screen h-20 bg-primary text-xl text-white font-bold animate-pulse ">
                        Click here if you can&apos;t find your order/medication above</button></Link>

            </div>

        </div>

    );
}
