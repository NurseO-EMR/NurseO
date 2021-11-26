import { filter } from 'lodash';
import React, { ChangeEvent } from 'react';
import { Subscription } from 'rxjs';
import Database from '../../Services/Database';
import { $error, $patient, $settings, $reportSet } from '../../Services/State';
import { Settings } from '../../Types/Settings';
import { Status } from '../../Types/Status';
import { ReportType, StudentReport, ReportSet } from '../../Types/Report';
import EmptyCard from '../Dashboard/Card/EmptyCard';
import { PatientNotFoundError } from '../../Types/ErrorCodes';
import { getTodaysDateAsString } from '../../Services/Util';
import ReportsSubmitterTabContent from './ReportsSubmitterTabContent';

type Props = React.HTMLAttributes<HTMLDivElement> & {
    reportType: ReportType
}

type State = {
    ReportSets: ReportSet[] | null,
    settings: Settings,
    date: string,
    saveButtonText: string,
    status: Status,
    timeSlots: Array<string>,
    selectedTab: number,
    note:string
}

export default class ReportsSubmitter extends React.Component<Props, State> {


    private subscriptions: Subscription[]
    private readonly tabsButtonClassNames;
    constructor(props: Props) {
        super(props);
        this.state = {
            ReportSets: null,
            settings: null,
            date: getTodaysDateAsString(),
            saveButtonText: "Save",
            status: "completed",
            timeSlots: [],
            selectedTab: 0,
            note: ""
        }

        this.subscriptions = [];
        this.tabsButtonClassNames = {
            active: "border-b-2 border-red-700 py-2 px-5 my-2 text-red-700 font-bold",
            inactive: "border-b-2 py-2 px-5 my-2"
        }
    }

    componentDidMount() {
        const ReportSetSubscription = $reportSet.subscribe(ReportSets => this.setState({
            ReportSets: filter(ReportSets, { type: this.props.reportType })
        }))

        const settingsSubscription = $settings.subscribe(settings => this.setState({
            settings
        }))

        this.subscriptions.push(ReportSetSubscription);
        this.subscriptions.push(settingsSubscription);

        // const patient = $patient.value
        // $patient.next(patient);
        // this.saveOnClickHandler();

    }


    onDateChangeHandler(date: ChangeEvent<HTMLInputElement>) {
        this.setState({
            date: date.target.value
        })
    }

    async saveOnClickHandler() {
        this.setState({
            saveButtonText: "Saving..."
        })
        const db = Database.getInstance();
        await db.updatePatient();
        this.setState({
            saveButtonText: "Saved"
        })
    }

    componentWillUnmount() {
        for (const subscription of this.subscriptions) {
            subscription.unsubscribe();
        }
        this.subscriptions = [];
    }

    onInputChangeHandler(filedName: string, timeSlotIndex: number, value: string) {

        const patient = $patient.value;
        const reportsSetIndex = this.state.selectedTab;
        if (patient === undefined) $error.next(new PatientNotFoundError());
        if (patient!.studentReports === undefined) patient!.studentReports = [];

        const updatedReport: StudentReport = {
            setName: this.state.ReportSets![reportsSetIndex].name,
            time: this.state.timeSlots[timeSlotIndex],
            value: value,
            vitalName: filedName,
            date: this.state.date,
            reportType: this.props.reportType,
            note: this.state.note
        }

        const reportSetIndex = this.getReportIndex(patient!.studentReports, updatedReport);
        if (reportSetIndex > -1) {
            patient!.studentReports[reportSetIndex].value = updatedReport.value;
        } else {
            patient?.studentReports.push(updatedReport)
        }
        $patient.next(patient);

    }

    getReportIndex(reports: StudentReport[], report: StudentReport): number {
        for (let i = 0; i < reports.length; i++) {
            const reportItem = reports[i];
            if (reportItem.setName !== report.setName) continue;
            if (reportItem.vitalName !== report.vitalName) continue;
            if (reportItem.time !== report.time) continue;
            return i;
        }
        return -1;
    }

    onTimeSlotChanges(timeSlots: Array<string>) {
        this.setState({ timeSlots })
    }

    onTabSelectionHandler(selectedTab: number) {
        this.setState({ selectedTab })
    }

    onNoteChangeHandler(event:ChangeEvent<HTMLTextAreaElement>) {
        this.setState({
            note:event.target.value
        })
    }

    public render() {
        return (
            <EmptyCard title="Assessments">
                <div className="px-28">
                    <div className="flex justify-between px-8 pt-4">
                        <div>
                            <label className="font-bold">Date: </label>
                            <input value={this.state.date} onChange={this.onDateChangeHandler.bind(this)} className="border-2 text-center" type="Date" />
                        </div>
                        <button onClick={this.saveOnClickHandler.bind(this)} className="bg-red-600 text-white rounded-full px-8 py-1">{this.state.saveButtonText}</button>
                    </div>

                    <div className="flex gap-3">
                        {this.state.ReportSets?.map((reportSet, i) => (
                            <>
                                <button
                                    className={this.state.selectedTab === i ? this.tabsButtonClassNames.active : this.tabsButtonClassNames.inactive}
                                    key={i}
                                    onClick={() => this.onTabSelectionHandler(i)}
                                >{reportSet.name}</button>
                            </>
                        ))}
                    </div>
                    {/* check if value is null */}
                    {this.state.ReportSets ? 
                        <ReportsSubmitterTabContent 
                            onInputChangeHandler={this.onInputChangeHandler.bind(this)} 
                            reportSet={this.state.ReportSets[this.state.selectedTab]} 
                            onTimeSlotChanges={this.onTimeSlotChanges.bind(this)}
                            /> 
                    : null}

                    <div>
                        <h1 className="text-red-700 text-xl font-bold">Nurse Note</h1>
                        <textarea className="w-full border-2 border-red-700 p-4" rows={5} 
                            onChange={this.onNoteChangeHandler.bind(this)} value={this.state.note}></textarea>
                    </div>

                </div>
            </EmptyCard>
        );
    }
}