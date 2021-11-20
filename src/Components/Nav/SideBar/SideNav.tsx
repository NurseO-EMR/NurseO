import React from 'react';
import SideNavHeader from './SideNavHeader';
import SideNavItem from './SideNavItem';


export default class SideNav extends React.Component<React.HTMLAttributes<HTMLDivElement>> {
    
    public render() {
        return (
            <div className={"shadow-lg h-full pt-1 bg-gray-600 " + this.props.className }>
                <SideNavHeader href="/studentView/dashboard">Dashboard</SideNavHeader>
                <SideNavItem href="/studentView/dashboard/medications">Medications</SideNavItem>
                <SideNavItem href="/studentView/dashboard/allergies">Allergies</SideNavItem>
                <SideNavItem href="/studentView/dashboard/flags">Flags</SideNavItem>

                <SideNavHeader href="/studentView/notes/view">Orders</SideNavHeader>
                <SideNavItem href="/studentView/orders/admission">Admission Orders</SideNavItem>
                <SideNavItem href="/studentView/notes/standing">Standing Orders</SideNavItem>
                <SideNavItem href="/studentView/notes/provider">Provider Orders</SideNavItem>

                <SideNavHeader href="/studentView/mar">Mar</SideNavHeader>
                <SideNavItem href="/studentView/mar">View Mar</SideNavItem>
                <SideNavItem href="/studentView/mar/administer">Administer Medications</SideNavItem>
                
                <SideNavHeader href="/studentView/vitals">Vitals</SideNavHeader>
                <SideNavItem href="/studentView/vitals/view">View Vitals</SideNavItem>
                <SideNavItem href="/studentView/vitals/submit">Submit Vitals</SideNavItem>
                
                <SideNavHeader href="/studentView/labs">Labs</SideNavHeader>
                <SideNavItem href="/studentView/labs/view">View Labs</SideNavItem>
                <SideNavItem href="">Request Labs</SideNavItem>
                
                <SideNavHeader href="/studentView/notes/view">Nursing Notes</SideNavHeader>
                <SideNavItem href="/studentView/notes/write">Write Note</SideNavItem>
                <SideNavItem href="/studentView/notes/view">View Notes</SideNavItem>
                
            </div>

        );
    }
}