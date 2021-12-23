import { filter } from 'lodash';
import React from 'react';
import { Note, PatientChart } from '../../../../Types/PatientProfile';
import { ReportType, StudentReport } from '../../../../Types/Report';
import ExtendableInput from '../../../Form/ExtendableInput';
import ReportsSubmitter from '../../../Reports/ReportsSubmitter';
import DataPreviewer from '../DataPreviewer';

type Props = {
    studentReports: StudentReport[],
    notes: Note[],
    reportType: ReportType,
    label: string,
    onUpdate?: (studentReports: StudentReport[], notes: Note[]) => void
}

type State = {
    showModal: boolean,
    editable: boolean
}

export default class ReportInput extends React.Component<Props, State> {

    private patient: PatientChart

    constructor(props:Props) {
        super(props)
        this.state = {
            showModal: false,
            editable: false
        }
        this.patient = new PatientChart();
        this.patient.studentReports = this.props.studentReports;
        this.patient.notes = this.props.notes;

    }

    onItemDeletedHandler(data: Object) {
        const reports = [...data as StudentReport[], ...this.getOtherReports()] as StudentReport[];
        if(this.patient) this.patient.studentReports = reports;
        this.onUpdate(this.patient);
    }

    onUpdate(patient:PatientChart) {
        const {studentReports, notes} = patient;
        this.setState({editable: this.getReportsForPreview().length > 0});
        if(this.props.onUpdate) this.props.onUpdate(studentReports, notes);
    }

    getReportsForPreview() {
        const filteredData = filter(this.patient?.studentReports, {reportType: this.props.reportType})
        return filteredData;
    }

    getOtherReports() {
        const filteredData = filter(this.patient?.studentReports, {reportType: !this.props.reportType})
        return filteredData;
    }

    public render() {
        return (
            <>
                <ExtendableInput id={this.props.label} label={this.props.label} hideSaveButton editable={this.state.editable} 
                    onEditClick={() => this.setState({showModal: true})}>
                    <ReportsSubmitter patient={this.patient} onUpdate={this.onUpdate.bind(this)} reportType={this.props.reportType} title={this.props.label} />
                </ExtendableInput>

                {this.patient ?
                <DataPreviewer onClose={() => this.setState({ showModal: false })}
                    onItemDeleted={this.onItemDeletedHandler.bind(this)}
                    data={this.getReportsForPreview()} show={this.state.showModal} />
                : null}
            </>

        );
    }
}