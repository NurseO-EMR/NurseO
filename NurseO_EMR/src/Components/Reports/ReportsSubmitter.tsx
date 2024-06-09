import { filter } from 'lodash';
import React, { ChangeEvent } from 'react';
import { Subscription } from 'rxjs';
import Database from '../../Services/Database';
import { $error, $patient, $settings } from '../../Services/State';
import { ReportType, StudentReport, ReportSet, PatientNotFoundError, Status, Settings, PatientChart } from "@nurse-o-core/index";
import { getTodaysDateAsString } from '../../Services/Util';
import ReportsSubmitterTabContent from './ReportsSubmitterTabContent';
import ReportTabs from './ReportTabs';
import SaveButton from '../Form/SaveButton';

type Props = React.HTMLAttributes<HTMLDivElement> & {
    reportType: ReportType,
    title: string,
    reportSets?: ReportSet[],
    patient?: PatientChart
    onUpdate?: (updatedPatient: PatientChart) => void,
    admin?: boolean,
}

type State = {
    reportSets: ReportSet[] | null,
    settings: Settings | null,
    date: string,
    status: Status,
    timeSlot: string,
    selectedTab: number,
    themeColor: string,
    numberOfTimeSlots: number
}

export default class ReportsSubmitter extends React.Component<Props, State> {


    private subscriptions: Subscription[]
    private patient:PatientChart
    private note:string;

    constructor(props: Props) {
        super(props);
        this.state = {
            reportSets: null,
            settings: null,
            date: getTodaysDateAsString(),
            status: "completed",
            timeSlot: "",
            selectedTab: 0,
            themeColor: this.props.admin ? "admin" : "primary",
            numberOfTimeSlots: 1
        }

        this.subscriptions = [];
        this.patient = new PatientChart();
        this.note = ""
    }

    componentDidUpdate(prev: Props) {
        if(this.props.reportSets !== prev.reportSets && this.props.reportSets)

        this.setState({
            reportSets:this.props.reportSets
        })
    }

    async componentDidMount() {
        if(this.props.reportSets) {
            this.setState({
                reportSets: this.props.reportSets
            })
        } else {
            const db = Database.getInstance();
            const settings = await db.getSettings();
            $settings.next(settings);
            if(settings) {
                this.setState({
                    reportSets: filter(settings.reportSet, { type: this.props.reportType })
                })
            }
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

    async saveOnClickHandler(wait: () => void, keepGoing: () => void) {
        const patient = this.patient;
        const reportsSetIndex = this.state.selectedTab;
        const db = Database.getInstance();

        wait();
        if (patient === undefined || patient === null) $error.next(new PatientNotFoundError());
        if (patient!.notes === undefined) patient!.notes = [];

        if(this.note !== "") {
            patient!.notes.push({
                date: `${this.state.date}`,
                note: this.note,
                reportType: this.props.reportType,
                reportName: this.state.reportSets![reportsSetIndex].name,
            })
        }
        

        if(this.props.patient) {
            if(this.props.onUpdate) this.props.onUpdate(this.patient);
        } else {
            console.log(patient.studentReports)
            await db.updatePatient();
            $patient.next(patient);
        }

        keepGoing();
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
            setName: this.state.reportSets![reportsSetIndex].name,
            time: this.state.timeSlot,
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

    onTimeSlotChanges(timeSlot: string) {
        this.setState({ timeSlot })
    }

    onTabSelectionHandler(selectedTab: number) {
        this.setState({ 
            selectedTab,
            
        })
    }

    onNoteChangeHandler(event: ChangeEvent<HTMLTextAreaElement>) {
        this.note = event.currentTarget.value
    }

    public render() {
        return (
                <div className="px-3.5">
                    <div className="flex justify-between px-8 pt-4">
                        <div>
                            <label className="font-bold">Date: </label>
                            <input value={this.state.date} onChange={this.onDateChangeHandler.bind(this)} className="border-2 text-center" type="Date" />
                        </div>
                        <SaveButton onClick={this.saveOnClickHandler.bind(this)} 
                        className={`bg-${this.state.themeColor} text-white rounded-full px-8 py-1`}
                        />
                    </div>


                    <ReportTabs onTabSelectionHandler={this.onTabSelectionHandler.bind(this)} reportSets={this.state.reportSets?.map(report=>report.name)}
                        selectedTab={this.state.selectedTab} />


                    {this.state.reportSets && this.state.reportSets[this.state.selectedTab] ?
                        <ReportsSubmitterTabContent
                            numberOfTimeSlots={this.state.numberOfTimeSlots}
                            onInputChangeHandler={this.onInputChangeHandler.bind(this)}
                            reportSet={this.state.reportSets[this.state.selectedTab]}
                            onTimeSlotChanges={this.onTimeSlotChanges.bind(this)}
                        />
                        : null}

                    <div>
                        <h1 className={`text-${this.state.themeColor} text-xl font-bold`}>Nurse Note</h1>
                        <textarea className={`w-full border-2 border-${this.state.themeColor} p-4`} rows={5}
                            spellCheck="true"
                            onChange={this.onNoteChangeHandler.bind(this)}></textarea>
                    </div>

                </div>
        );
    }
}