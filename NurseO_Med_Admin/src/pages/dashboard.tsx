import { Mar } from '~/components/Mar/Mar';
import { TopNav } from '~/components/Nav/TopMenu/TopNav';
import { useContext } from "react";
import { GlobalContext } from '~/services/State';
import Link from 'next/link';

export default function DashboardPage() {
    const { patientMedOrders, time } = useContext(GlobalContext)


    return (
        <div className="overflow-x-hidden">
            <TopNav />
            <Mar orders={patientMedOrders} simTime={time} />
            <div className="w-screen flex justify-center">
            <Link href="/AZListing">
                    <button className=" w-screen h-20 bg-primary text-xl text-white font-bold animate-pulse ">
                        Click here if you can&apos;t find your order/medication above</button></Link>

            </div>

        </div>

    );
}
