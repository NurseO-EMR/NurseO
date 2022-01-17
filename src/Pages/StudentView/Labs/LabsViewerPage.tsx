import { filter } from 'lodash';
import React from 'react';
import LabViewer from '../../../Components/Labs/LabViewer';
import { PatientChart } from '../../../Types/PatientProfile';
import { StudentReport } from '../../../Types/Report';
import StudentViewPage from '../StudentViewPage';


type Props = {
    patient:PatientChart
}
export default class LabsViewerPage extends React.Component<Props> {
    private labsReport:StudentReport[]
    
    constructor(props: Props) {
        super(props);
        this.labsReport = filter(this.props.patient?.studentReports, {reportType: 'studentLabReport'} )
    }

    public render() {	
        return (
            <StudentViewPage patient={this.props.patient}>
                <LabViewer docLink={this.props.patient.labDocURL}></LabViewer>
            </StudentViewPage>

        );
    }	
}