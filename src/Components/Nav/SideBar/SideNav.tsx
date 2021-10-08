import React from 'react';
import SideNavHeader from './SideNavHeader';
import SideNavItem from './SideNavItem';


export default class SideNav extends React.Component<React.HTMLAttributes<HTMLDivElement>> {
    
    public render() {
        return (
            <div className={"shadow-lg h-screen pt-1 " + this.props.className }>
                <SideNavHeader href="/studentView/dashboard">Dashboard</SideNavHeader>
                <SideNavItem>Medications</SideNavItem>
                <SideNavItem>Allergies</SideNavItem>
                <SideNavItem>Flags</SideNavItem>
                <SideNavHeader href="/studentView/mar">Mar</SideNavHeader>
                <SideNavItem>View Mar</SideNavItem>
                <SideNavItem>Administer Medications</SideNavItem>
                <SideNavHeader href="/studentView/vitals">Vitals</SideNavHeader>
                <SideNavItem>View Vitals</SideNavItem>
                <SideNavItem>Submit Vitals</SideNavItem>
                <SideNavItem>View Vitals trend</SideNavItem>
                <SideNavHeader href="/studentView/labs">Labs</SideNavHeader>
                <SideNavItem>View Labs</SideNavItem>
                <SideNavItem>View Labs Trend</SideNavItem>
                <SideNavItem>Request Labs</SideNavItem>
                
            </div>

        );
    }
}