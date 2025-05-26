import { type ReactElement, useContext, useEffect } from 'react';
import ArmBand from '~/components/EMR/ArmBand/ArmBand';
import SideNav from '~/components/EMR/Nav/SideBar/SideNav';
import SideNavHeader from '~/components/EMR/Nav/SideBar/SideNavHeader';
import SideNavItem from '~/components/EMR/Nav/SideBar/SideNavItem';
import TopNav from '~/components/EMR/Nav/TopMenu/TopNav';
import { ColorThemeSelector } from '~/components/common/ColorThemeSelector';
import { GlobalContext } from '~/services/State';
import { useRouter } from 'next/router';

type Props = {
    children: ReactElement | ReactElement[]
}

export default function StudentViewPage(props: Props) {
    const { studentId, patient } = useContext(GlobalContext)
    const router = useRouter()

    useEffect(() => {
        // TapOutService.initialize() // not working 
        if (studentId.length === 0) void router.push("/grad/")
        if (!patient) void router.push("/grad/SelectPatient/")

    }, [patient, router, studentId.length])

    return (
        <main className="grid grid-areas-main min-h-screen grid-cols-twoSections grid-rows-threeSections relative">
            <TopNav homePageLink='/grad/' className="grid-in-topNav"></TopNav>
            <ArmBand patient={patient} className="grid-in-armBand"></ArmBand>
            <SideNav className="grid-in-sideBar">
                <SideNavHeader href="/grad/StudentView/Dashboard">Dashboard</SideNavHeader>
                <SideNavItem href="/grad/StudentView/Dashboard/medications">Medications</SideNavItem>
                <SideNavItem href="/grad/StudentView/Dashboard/allergies">Allergies</SideNavItem>
                <SideNavItem href="/grad/StudentView/Dashboard/flags">Flags</SideNavItem>

                <SideNavHeader href="/grad/StudentView/Orders/allOrders">Orders</SideNavHeader>
                <SideNavItem href="/grad/StudentView/Orders/new">Add Orders</SideNavItem>
                <SideNavItem href="/grad/StudentView/Orders/admission">Admission Orders</SideNavItem>
                <SideNavItem href="/grad/StudentView/Orders/standing">Standing Orders</SideNavItem>
                <SideNavItem href="/grad/StudentView/Orders/provider">Provider Orders</SideNavItem>

                <SideNavHeader href="/grad/StudentView/Vitals/">Vitals</SideNavHeader>
                <SideNavItem href="/grad/StudentView/Vitals/view">View Vitals</SideNavItem>
                <SideNavItem href="/grad/StudentView/Vitals/">Submit Vitals</SideNavItem>

                <SideNavHeader href="/grad/StudentView/Assessments/">Assessments</SideNavHeader>
                <SideNavItem href="/grad/StudentView/Assessments/view">View Assessment</SideNavItem>
                <SideNavItem href="/grad/StudentView/Assessments/">Submit Assessment</SideNavItem>

                <SideNavHeader href="/grad/StudentView/IORecord/">I/O Record</SideNavHeader>
                <SideNavItem href="/grad/StudentView/IORecord/view">View I/O Record</SideNavItem>
                <SideNavItem href="/grad/StudentView/IORecord/">Submit I/O Record</SideNavItem>

                <SideNavHeader href="/grad/StudentView/Labs/">Results</SideNavHeader>
                <SideNavItem href="/grad/StudentView/Labs/">View Lab Results</SideNavItem>
                <SideNavItem href="/grad/StudentView/Imaging/">View Imaging Results</SideNavItem>

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
