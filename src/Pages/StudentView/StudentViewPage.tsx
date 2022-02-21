import { getAuth } from 'firebase/auth';
import React from 'react';
import ArmBand from '../../Components/ArmBand/ArmBand';
import SideNav from '../../Components/Nav/SideBar/SideNav';
import SideNavHeader from '../../Components/Nav/SideBar/SideNavHeader';
import SideNavItem from '../../Components/Nav/SideBar/SideNavItem';
import TopNav from '../../Components/Nav/TopMenu/TopNav';
import { $history, $patient } from '../../Services/State';
import { PatientChart } from '../../Types/PatientProfile';

type Props = {
    patient: PatientChart
}

export default class StudentViewPage extends React.Component<Props> {

    componentDidMount() {
        if (!getAuth().currentUser) $history.value.push("/")
        if (!$patient.value) $history.value.push("/studentView/selectPatient")
    }

    public render() {
        return (
            <div className="grid grid-areas-main min-h-screen grid-cols-twoSections grid-rows-threeSections">
                <TopNav className="grid-in-topNav"></TopNav>
                <ArmBand patient={this.props.patient} className="grid-in-armBand"></ArmBand>
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

                    <SideNavHeader href="/studentView/scales/submit">Scales</SideNavHeader>
                    <SideNavItem href="/studentView/scales/view">View Scales</SideNavItem>
                    <SideNavItem href="/studentView/scales/submit">Submit Scales</SideNavItem>

                    <SideNavHeader href="/studentView/labs">Labs</SideNavHeader>
                    <SideNavItem href="/studentView/labs/view">View Labs</SideNavItem>

                </SideNav>
                <div className="grid-in-main mb-4">
                    {this.props.children}
                </div>
            </div>
        );
    }
}