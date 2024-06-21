import { type ReactElement, useContext, useEffect } from 'react';
import ArmBand from '../../Components/ArmBand/ArmBand';
import SideNav from '../../Components/Nav/SideBar/SideNav';
import SideNavHeader from '../../Components/Nav/SideBar/SideNavHeader';
import SideNavItem from '../../Components/Nav/SideBar/SideNavItem';
import TopNav from '../../Components/Nav/TopMenu/TopNav';
import TapOutService from '../../Services/TapOutService';
import { ColorThemeSelector } from '../../Components/ColorThemeSelector';
import { GlobalContext } from '~/Services/State';
import { useRouter } from 'next/router';

type Props = {
    children: ReactElement | ReactElement[]
}

export default function StudentViewPage(props:Props) {
        const {studentId, patient} = useContext(GlobalContext)
        const router = useRouter()

        useEffect(()=>{
            TapOutService.initialize() // not working 
            if(studentId.length === 0) void router.push("/")
            if(!patient) void router.push("/SelectPatient/")
        
        }, [patient, router, studentId.length])

        return (
            <main className="grid grid-areas-main min-h-screen grid-cols-twoSections grid-rows-threeSections relative">
                <TopNav className="grid-in-topNav"></TopNav>
                <ArmBand patient={patient} className="grid-in-armBand"></ArmBand>
                <SideNav className="grid-in-sideBar">
                    <SideNavHeader href="/StudentView/dashboard">Dashboard</SideNavHeader>
                    <SideNavItem href="/StudentView/dashboard/medications">Medications</SideNavItem>
                    <SideNavItem href="/StudentView/dashboard/allergies">Allergies</SideNavItem>
                    <SideNavItem href="/StudentView/dashboard/flags">Flags</SideNavItem>

                    <SideNavHeader href="/StudentView/Orders/allOrders">Orders</SideNavHeader>
                    <SideNavItem href="/StudentView/Orders/admission">Admission Orders</SideNavItem>
                    <SideNavItem href="/StudentView/Orders/standing">Standing Orders</SideNavItem>
                    <SideNavItem href="/StudentView/Orders/provider">Provider Orders</SideNavItem>

                    <SideNavHeader href="/StudentView/Mar">Mar</SideNavHeader>
                    <SideNavItem href="/StudentView/Mar">View Mar</SideNavItem>
                    <SideNavItem href="/StudentView/Mar/administer">Administer Medications</SideNavItem>

                    <SideNavHeader href="/StudentView/Vitals/">Vitals</SideNavHeader>
                    <SideNavItem href="/StudentView/Vitals/view">View Vitals</SideNavItem>
                    <SideNavItem href="/StudentView/Vitals/">Submit Vitals</SideNavItem>

                    <SideNavHeader href="/StudentView/Assessments/">Assessments</SideNavHeader>
                    <SideNavItem href="/StudentView/Assessments/view">View Assessment</SideNavItem>
                    <SideNavItem href="/StudentView/Assessments/">Submit Assessment</SideNavItem>

                    <SideNavHeader href="/StudentView/IORecord/">I/O Record</SideNavHeader>
                    <SideNavItem href="/StudentView/IORecord/view">View I/O Record</SideNavItem>
                    <SideNavItem href="/StudentView/IORecord/">Submit I/O Record</SideNavItem>

                    <SideNavHeader href="/StudentView/labs">Results</SideNavHeader>
                    <SideNavItem href="/StudentView/labs/view">View Lab Results</SideNavItem>
                    <SideNavItem href="/StudentView/imaging/view">View Imaging Results</SideNavItem>

                </SideNav>
                <div className="grid-in-main mb-4">
                    {props.children}
                    <div className='flex justify-end mr-10 mt-4'>
                        <div className='scale-75'>
                            <ColorThemeSelector hideLabels />
                        </div>
                    </div>
                </div>
            </main>
        );
    }
