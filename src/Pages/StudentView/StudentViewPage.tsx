import React from 'react';
import ArmBand from '../../Components/ArmBand/ArmBand';
import SideNav from '../../Components/Nav/SideBar/SideNav';
import TopNav from '../../Components/Nav/TopMenu/TopNav';
import { PatientChart } from '../../Types/PatientProfile';

type Props = {
    patient: PatientChart
}

export default class StudentViewPage extends React.Component<Props> {

    public render() {
        return (
            <div className="grid grid-areas-main min-h-screen grid-cols-twoSections">
                <TopNav className="grid-in-topNav"></TopNav>
                <ArmBand patient={this.props.patient} className="grid-in-armBand"></ArmBand>
                <SideNav className="grid-in-sideBar"></SideNav>
                {this.props.children}
            </div>

        );
    }
}