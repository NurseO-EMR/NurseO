import { getAuth } from 'firebase/auth';
import { ReactChild, useEffect } from 'react';
import ArmBand from '../../Components/ArmBand/ArmBand';
import SideNav from '../../Components/Nav/SideBar/SideNav';
import SideNavHeader from '../../Components/Nav/SideBar/SideNavHeader';
import SideNavItem from '../../Components/Nav/SideBar/SideNavItem';
import TopNav from '../../Components/Nav/TopMenu/TopNav';
import { $patient } from '../../Services/State';
import TapOutService from '../../Services/TapOutService';
import { PatientChart } from 'nurse-o-core';
import {Redirect} from "react-router-dom"
import { getApps } from 'firebase/app';
import { ColorThemeSelector } from '../../Components/ColorThemeSelector';

type Props = {
    patient: PatientChart,
    children: Element | Element[] | ReactChild | ReactChild[] | null
}

export default function StudentViewPage(props:Props) {
        useEffect(()=>TapOutService.initialize(),[])

        if(getApps().length === 0) {
            window.location.href = "/"
        }
        
        if (!getAuth().currentUser) return <Redirect to="/" />
        if (!$patient.value)  return <Redirect to="/studentView/selectPatient" />

        return (
            <main className="grid grid-areas-main min-h-screen grid-cols-twoSections grid-rows-threeSections">
                <TopNav className="grid-in-topNav"></TopNav>
                <ArmBand patient={props.patient} className="grid-in-armBand"></ArmBand>
                <SideNav className="grid-in-sideBar">
                    <SideNavHeader href="/studentView/dashboard">Dashboard</SideNavHeader>
                    <SideNavItem href="/studentView/dashboard/medications">Medications</SideNavItem>
                    <SideNavItem href="/studentView/dashboard/allergies">Allergies</SideNavItem>
                    <SideNavItem href="/studentView/dashboard/flags">Flags</SideNavItem>

                    <SideNavHeader href="/studentView/orders/all">Orders</SideNavHeader>
                    <SideNavItem href="/studentView/orders/admission">Admission Orders</SideNavItem>
                    <SideNavItem href="/studentView/orders/standing">Standing Orders</SideNavItem>
                    <SideNavItem href="/studentView/orders/provider">Provider Orders</SideNavItem>

                    <SideNavHeader href="/studentView/mar">Mar</SideNavHeader>
                    <SideNavItem href="/studentView/mar">View Mar</SideNavItem>
                    <SideNavItem href="/studentView/mar/administer">Administer Medications</SideNavItem>

                    <SideNavHeader href="/studentView/vitals">Vitals</SideNavHeader>
                    <SideNavItem href="/studentView/vitals/view">View Vitals</SideNavItem>
                    <SideNavItem href="/studentView/vitals/submit">Submit Vitals</SideNavItem>

                    <SideNavHeader href="/studentView/assessment/submit">Assessments</SideNavHeader>
                    <SideNavItem href="/studentView/assessment/view">View Assessment</SideNavItem>
                    <SideNavItem href="/studentView/assessment/submit">Submit Assessment</SideNavItem>

                    <SideNavHeader href="/studentView/io/submit">I/O Record</SideNavHeader>
                    <SideNavItem href="/studentView/io/view">View I/O Record</SideNavItem>
                    <SideNavItem href="/studentView/io/submit">Submit I/O Record</SideNavItem>

                    <SideNavHeader href="/studentView/labs">Results</SideNavHeader>
                    <SideNavItem href="/studentView/labs/view">View Lab Results</SideNavItem>
                    <SideNavItem href="/studentView/imaging/view">View Imaging Results</SideNavItem>

                </SideNav>
                <div className="grid-in-main mb-4">
                    {props.children}
                </div>
                <ColorThemeSelector />
            </main>
        );
    }
