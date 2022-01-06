import { getAuth } from 'firebase/auth';
import React from 'react';
import ArmBand from '../../Components/ArmBand/ArmBand';
import SideNav from '../../Components/Nav/SideBar/SideNav';
import TopNav from '../../Components/Nav/TopMenu/TopNav';
import { $history, $patient } from '../../Services/State';
import { PatientChart } from '../../Types/PatientProfile';

type Props = {
    patient: PatientChart
}

export default class StudentViewPage extends React.Component<Props> {

    componentDidMount() {
        if(!getAuth().currentUser) $history.value.push("/")
        if(!$patient.value) $history.value.push("/studentView/selectPatient")
    }

    public render() {
        return (
            <div className="grid grid-areas-main min-h-screen grid-cols-twoSections grid-rows-threeSections">
                <TopNav className="grid-in-topNav"></TopNav>
                <ArmBand patient={this.props.patient} className="grid-in-armBand"></ArmBand>
                <SideNav className="grid-in-sideBar"></SideNav>
                <div className="grid-in-main mb-4">
                    {this.props.children}
                </div>
            </div>
        );
    }
}