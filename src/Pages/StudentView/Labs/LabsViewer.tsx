import { filter } from 'lodash';
import React from 'react';
import ReportsViewer from '../../../Components/Reports/ReportsViewer';
import { PatientChart } from '../../../Types/PatientProfile';
import { StudentReport } from '../../../Types/Report';
import StudentViewPage from '../StudentViewPage';


type Props = {
    patient:PatientChart
}
export default class LabsViewer extends React.Component<Props> {
    private labsReport:StudentReport[]
    
    constructor(props: Props) {
        super(props);
        this.labsReport = filter(this.props.patient?.studentReports, {reportType: 'studentLabReport'} )
    }

    public render() {	
        return (
            <StudentViewPage patient={this.props.patient}>
                <ReportsViewer title="Labs" studentReport={this.labsReport}></ReportsViewer>
            </StudentViewPage>

        );
    }	
}