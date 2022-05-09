import { filter } from 'lodash';
import React from 'react';
import ReportsViewer from '../../../Components/Reports/ReportsViewer';
import { $error } from '../../../Services/State';
import { PatientNotFoundError } from '../../../Types/ErrorCodes';
import { PatientChart } from '../../../Types/PatientProfile';
import { StudentReport } from '../../../Types/Report';
import StudentViewPage from '../StudentViewPage';

type Props = {
    patient: PatientChart
}

export default class IORecordViewPage extends React.Component<Props> {

    private report:StudentReport[]

    constructor(props: Props) {
        super(props);
        this.report = filter(this.props.patient?.studentReports, {reportType: 'studentIOReport'} )
    }

    componentDidMount(){
        if(this.props.patient === null) {
            $error.next(new PatientNotFoundError())
        }
    }

    public render() {
        return (
            <StudentViewPage patient={this.props.patient}>
                <ReportsViewer studentReport={this.report} title={"I/O"} showNotes/>
            </StudentViewPage>
        );
    }
}