import React from 'react';


export default class SideNav extends React.Component<React.HTMLAttributes<HTMLDivElement>> {
    
    public render() {
        return (
            <div className={"shadow-lg h-screen pt-1 " + this.props.className }>
                <h1>Dashboard</h1>
                <div>Medications</div>
                <div>Allergies</div>
                <div>Flags</div>
                <h1>Mar</h1>
                <div>View Mar</div>
                <div>Administer Medications</div>
                <h1>Vitals</h1>
                <div>View Vitals</div>
                <div>Submit Vitals</div>
                <div>View Vitals trend</div>
                <h1>Labs</h1>
                <div>View Labs</div>
                <div>View Labs Trend</div>
                <div>Request Labs</div>
                
            </div>

        );
    }
}