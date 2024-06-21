import { filter } from 'lodash';
import React from 'react';
import ReportsViewer from '../../../Components/Reports/ReportsViewer';
import { $error } from '../../../Services/State';
import { PatientNotFoundError, StudentReport } from "@nurse-o-core/index";
import { PatientChart } from "@nurse-o-core/index";
import StudentViewPage from '../_StudentViewPage';


type Props =  {
    patient: PatientChart,
}
export default class AssessmentViewPage extends React.Component<Props> {

    private report:StudentReport[]

    constructor(props: Props) {
        super(props);
        this.report = filter(this.props.patient?.studentReports, {reportType: 'studentAssessmentReport'} )
    }

    componentDidMount(){
        if(this.props.patient === null) {
            $error.next(new PatientNotFoundError())
        }
    }

    public render() {	
        return (
            <StudentViewPage patient={this.props.patient}>
                <ReportsViewer studentReport={this.report} title={"Assessment"} showNotes/>
            </StudentViewPage>

        );
    }	
}