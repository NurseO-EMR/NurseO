import { filter } from 'lodash';
import React, { ChangeEvent } from 'react';
import { Subscription } from 'rxjs';
import Database from '../../Services/Database';
import { $error, $patient, $settings } from '../../Services/State';
import { Settings } from '../../Types/Settings';
import { Status } from '../../Types/Status';
import { ReportType, StudentReport, ReportSet } from '../../Types/Report';
import { PatientNotFoundError } from '../../Types/ErrorCodes';
import { getTodaysDateAsString } from '../../Services/Util';
import ReportsSubmitterTabContent from './ReportsSubmitterTabContent';
import ReportTabs from './ReportTabs';
import { PatientChart } from '../../Types/PatientProfile';

type Props = React.HTMLAttributes<HTMLDivElement> & {
    reportType: ReportType,
    title: string,
    reportSets?: ReportSet[],
    patient?: PatientChart
    onUpdate?: (updatedPatient: PatientChart) => void
}

type State = {
    ReportSets: ReportSet[] | null,
    settings: Settings,
    date: string,
    saveButtonText: string,
    status: Status,
    timeSlots: Array<string>,
    selectedTab: number,
    note: string,
    themeColor: string,
    numberOfTimeSlots: number
}

export default class ReportsSubmitter extends React.Component<Props, State> {


    private subscriptions: Subscription[]
    private readonly tabsButtonClassNames;
    private patient:PatientChart
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
            note: "",
            themeColor: "red-600",
            numberOfTimeSlots: this.props.reportType === "studentAssessmentReport" ? 1 : $settings.value!.numberOfTimeSlots
        }

        this.subscriptions = [];
        this.tabsButtonClassNames = {
            active: "border-b-2 border-primary py-2 px-5 my-2 text-primary font-bold",
            inactive: "border-b-2 py-2 px-5 my-2"
        }
        this.patient = new PatientChart();
    }

    componentDidUpdate(prev: Props) {
        if(this.props.reportSets !== prev.reportSets && this.props.reportSets)

        this.setState({
            ReportSets:this.props.reportSets
        })
    }

    componentDidMount() {
        if(this.props.reportSets) {
            this.setState({
                ReportSets: this.props.reportSets
            })
        } else {
            const ReportSetSubscription = $settings.subscribe(setting => this.setState({
                ReportSets: filter(setting?.reportSet, { type: this.props.reportType })
            }))
            this.subscriptions.push(ReportSetSubscription);
        }
        

        if(this.props.patient) {
            this.patient = this.props.patient;
        } else {
            const patientSubscription = $patient.subscribe(p=>this.patient=p);
            this.subscriptions.push(patientSubscription);
        }

        


        const settingsSubscription = $settings.subscribe(settings => this.setState({settings}))
        this.subscriptions.push(settingsSubscription);


    }


    onDateChangeHandler(date: ChangeEvent<HTMLInputElement>) {
        this.setState({
            date: date.target.value
        })
    }

    async saveOnClickHandler() {
        const patient = this.patient;
        const reportsSetIndex = this.state.selectedTab;
        const db = Database.getInstance();

        this.setState({saveButtonText: "Saving..."});
        
        if (patient === undefined || patient === null) $error.next(new PatientNotFoundError());
        if (patient!.notes === undefined) patient!.notes = [];

        patient!.notes.push({
            date: `${this.state.date}`,
            note: this.state.note,
            reportType: this.props.reportType,
            reportName: this.state.ReportSets![reportsSetIndex].name,
        })
        

        if(this.props.patient) {
            if(this.props.onUpdate) this.props.onUpdate(this.patient);
        } else {
            await db.updatePatient();
            $patient.next(patient);
        }

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

        const patient = this.patient;
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
        }

        const reportSetIndex = this.getReportIndex(patient!.studentReports, updatedReport);
        if (reportSetIndex > -1) {
            patient!.studentReports[reportSetIndex].value = updatedReport.value;
        } else {
            patient?.studentReports.push(updatedReport)
        }
        this.patient = patient;

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

    onNoteChangeHandler(event: ChangeEvent<HTMLTextAreaElement>) {
        this.setState({note:event.target.value});
    }

    public render() {
        return (
                <div className="px-3.5">
                    <div className="flex justify-between px-8 pt-4">
                        <div>
                            <label className="font-bold">Date: </label>
                            <input value={this.state.date} onChange={this.onDateChangeHandler.bind(this)} className="border-2 text-center" type="Date" />
                        </div>
                        <button onClick={this.saveOnClickHandler.bind(this)} 
                        className={`bg-${this.state.themeColor} text-white rounded-full px-8 py-1`}
                        >{this.state.saveButtonText}</button>
                    </div>


                    <ReportTabs onTabSelectionHandler={this.onTabSelectionHandler.bind(this)} reportSets={this.state.ReportSets?.map(report=>report.name)}
                        selectedTab={this.state.selectedTab} />


                    {this.state.ReportSets && this.state.ReportSets[this.state.selectedTab] ?
                        <ReportsSubmitterTabContent
                            numberOfTimeSlots={this.state.numberOfTimeSlots}
                            onInputChangeHandler={this.onInputChangeHandler.bind(this)}
                            reportSet={this.state.ReportSets[this.state.selectedTab]}
                            onTimeSlotChanges={this.onTimeSlotChanges.bind(this)}
                        />
                        : null}

                    <div>
                        <h1 className={`text-${this.state.themeColor} text-xl font-bold`}>Nurse Note</h1>
                        <textarea className={`w-full border-2 border-${this.state.themeColor} p-4`} rows={5}
                            onChange={this.onNoteChangeHandler.bind(this)} value={this.state.note}></textarea>
                    </div>

                </div>
        );
    }
}