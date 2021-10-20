import { filter } from 'lodash';
import React from 'react';
import ArmBand from '../../../Components/ArmBand/ArmBand';
import SideNav from '../../../Components/Nav/SideBar/SideNav';
import TopNav from '../../../Components/Nav/TopMenu/TopNav';
import ReportsViewer from '../../../Components/Reports/ReportsViewer';
import { $error } from '../../../Services/State';
import { PatientChart } from '../../../Types/PatientProfile';
import { StudentReport } from '../../../Types/Report';


type Props =  {
    patient: PatientChart,
}
export default class VitalsViewPage extends React.Component<Props> {

    private vitalsReport:StudentReport[]

    constructor(props: Props) {
        super(props);
        this.vitalsReport = filter(this.props.patient?.studentReports, {reportType: 'studentVitalsReport'} )
    }

    componentDidMount(){
        if(this.props.patient === null) {
            $error.next("Please Scan patient barcode")
        }
    }

    public render() {	
        return (
            <div className="grid grid-areas-main h-full grid-cols-twoSections ">
                <TopNav className="grid-in-topNav"></TopNav>
                <ArmBand patient={this.props.patient} className="grid-in-armBand"></ArmBand>
                <SideNav className="grid-in-sideBar"></SideNav>
                <ReportsViewer studentReport={this.vitalsReport} className="grid-in-main border-t-8" />
            </div>

        );
    }	
}