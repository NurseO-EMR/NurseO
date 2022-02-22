import React from 'react';
import TopNav from '../../Components/Nav/TopMenu/TopNav';
import {getAuth} from "firebase/auth"
import Database from "./../../Services/Database";
import { $history } from '../../Services/State';
import SideNav from '../../Components/Nav/SideBar/SideNav';
import SideNavHeader from '../../Components/Nav/SideBar/SideNavHeader';
// import { $history } from '../../Services/State';
type Props = {
    selected: "Dashboard" | "Create Patient" | "View Patients" | "Edit Assessment" | "Edit Vitals" | "Edit Medications" | "Add/Remove Admins" | "Edit Settings Raw" | "Edit Scales"
}
export default class AdminViewPage extends React.Component<Props> {

    private selectedStyle = "bg-gray-800";

    async componentDidMount() {
        const db = Database.getInstance();
        const admins = await db.getAdminList();
        if(!getAuth().currentUser || admins.indexOf(getAuth().currentUser!.email!) === -1) {
            $history.value.push("/")
        }
    }

    public render() {	
        return (
            <div className='grid grid-areas-main min-h-screen grid-cols-twoSections grid-rows-threeSections'>
                <TopNav className="grid-in-topNav"></TopNav>

                <SideNav className="grid-in-sideBar flex flex-col gap-2">
                    <SideNavHeader admin href="/admin/dashboard" className={this.props.selected === "Dashboard" ? this.selectedStyle : null}>Dashboard</SideNavHeader>
                    <SideNavHeader admin href="/admin/patient/create" className={this.props.selected === "Create Patient" ? this.selectedStyle : null}>Create Patient</SideNavHeader>
                    <SideNavHeader admin href="/admin/patient/view" className={this.props.selected === "View Patients" ? this.selectedStyle : null}>View Patients</SideNavHeader>
                    <SideNavHeader admin href="/admin/assessments/edit" className={this.props.selected === "Edit Assessment" ? this.selectedStyle : null}>Edit Assessments</SideNavHeader>
                    <SideNavHeader admin href="/admin/vitals/edit" className={this.props.selected === "Edit Vitals" ? this.selectedStyle : null}>Edit Vitals</SideNavHeader>
                    <SideNavHeader admin href="/admin/scales/edit" className={this.props.selected === "Edit Scales" ? this.selectedStyle : null}>Edit Scales</SideNavHeader>
                    <SideNavHeader admin href="/admin/medication/edit" className={this.props.selected === "Edit Medications" ? this.selectedStyle : null}>Edit Medications</SideNavHeader>
                    <SideNavHeader admin href="/admin/editAdmins" className={this.props.selected === "Add/Remove Admins" ? this.selectedStyle : null}>Add/Remove Admins</SideNavHeader>
                    <SideNavHeader admin href="/admin/settings/raw" className={this.props.selected === "Edit Settings Raw" ? this.selectedStyle : null}>Edit Settings Raw</SideNavHeader>
                </SideNav>
                <div className="grid-in-main">
                    {this.props.children}
                </div>
            </div>

        );
    }	
}