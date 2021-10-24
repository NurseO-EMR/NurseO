import { filter } from 'lodash';
import React, { ChangeEvent } from 'react';
import { Subscription } from 'rxjs';
import Database from '../../Services/Database';
import { $error, $patient, $settings, $reportSet } from '../../Services/State';
import { Settings } from '../../Types/Settings';
import { Status } from '../../Types/Status';
import { ReportType, StudentReport, ReportSet } from '../../Types/Report';
import EmptyCard from '../Dashboard/Card/EmptyCard';
import TableHeader from '../TableHeader';
import ReportsHeaderTimeSlots from './ReportsHeaderTimeSlots';
import ReportInput from './ReportInput';
import { PatientNotFoundError } from '../../Types/ErrorCodes';

type Props =  React.HTMLAttributes<HTMLDivElement> &  {
    reportType: ReportType
}

type State = {
    ReportSet: ReportSet[] | null,
    settings: Settings,
    date: string,
    saveButtonText: string,
    status: Status,
    timeSlots: Array<string>,
}

export default class ReportsSubmitter extends React.Component<Props, State> {


    private subscriptions: Subscription[]

    constructor(props:Props) {
        super(props);
        this.state = {
            ReportSet: null,
            settings: null,
            date: this.getTodaysDate(),
            saveButtonText: "Save",
            status: "completed",
            timeSlots: [],
        }

        this.subscriptions = [];
    }

    componentDidMount() {
        const ReportSetSubscription =  $reportSet.subscribe(ReportSet=>this.setState({
            ReportSet: filter(ReportSet,{type:this.props.reportType})
        }))

        const settingsSubscription = $settings.subscribe(settings=>this.setState({
            settings
        }))

        this.subscriptions.push(ReportSetSubscription);
        this.subscriptions.push(settingsSubscription);
        
        // const patient = $patient.value
        // patient!.studentReports = [];
        // $patient.next(patient);
        // this.saveOnClickHandler();

    }

    getTodaysDate():string {
        const date = new Date();
        const year = date.getFullYear();
        const month = `${(date.getMonth()+1)}`.padStart(2,"0");
        const day = `${(date.getDate()+1)}`.padStart(2,"0");
        return `${year}-${month}-${day}`;
    }

    onDateChangeHandler(date:ChangeEvent<HTMLInputElement>) {
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

    componentWillUnmount(){
        for(const subscription of this.subscriptions) {
            subscription.unsubscribe();
        }
        this.subscriptions = [];
    }

    onInputChangeHandler(filedName: string, timeSlotIndex: number, value: string, reportsSetIndex: number) {
        
        const patient = $patient.value;
        if(patient === undefined) $error.next(new PatientNotFoundError()); 
        if(patient!.studentReports === undefined) patient!.studentReports = [];
        
        const updatedReport:StudentReport = {
            setName: this.state.ReportSet![reportsSetIndex].name,
            time: this.state.timeSlots[timeSlotIndex],
            value: value,
            vitalName: filedName,
            date: this.state.date,
            reportType: this.props.reportType
        }

        const reportSetIndex= this.getReportIndex(patient!.studentReports, updatedReport);
        if(reportSetIndex>-1) {
            patient!.studentReports[reportSetIndex].value=updatedReport.value;
        } else {
            patient?.studentReports.push(updatedReport)
        }

        $patient.next(patient);
        
    }

    getReportIndex(reports:StudentReport[], report: StudentReport):number {
        for(let i = 0; i<reports.length; i++) {
            const reportItem = reports[i];
            if(reportItem.setName !== report.setName) continue;
            if(reportItem.vitalName !== report.vitalName) continue;
            if(reportItem.time !== report.time) continue;
            return i;
        }
        return -1;
    }

    onTimeSlotChanges(timeSlots:Array<string>){
        this.setState({timeSlots})
    }
    public render() {	
        return (
            <EmptyCard title="Vitals">
                <div className="px-28">
                    <div className="flex justify-between px-8 pt-4">
                        <div>
                            <label className="font-bold">Date: </label>
                            <input value={this.state.date} onChange={this.onDateChangeHandler.bind(this)} className="border-2 text-center" type="Date" />
                        </div>
                        <button onClick={this.saveOnClickHandler.bind(this)} className="bg-red-600 text-white rounded-full px-8 py-1">{this.state.saveButtonText}</button>
                    </div>
                    
                    {this.state.ReportSet?.map((val,i)=>{
                        return (
                            <div key={i}>
                                <TableHeader>{val.name}</TableHeader>
                                <table className="w-full">
                                    <thead>
                                        <ReportsHeaderTimeSlots onChange={this.onTimeSlotChanges.bind(this)} numberOfTimeSlots={this.state.settings?.numberOfTimeSlots}></ReportsHeaderTimeSlots>
                                    </thead>

                                    <tbody>
                                        {val.vitals.map((val, j)=>
                                            <ReportInput 
                                                onChange={(name,index,value)=> this.onInputChangeHandler(name,index,value,i)} 
                                                key={i+j} 
                                                numberOfTimeSlots={this.state.settings?.numberOfTimeSlots} 
                                                vital={val} />
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        )
                    })}
                </div>
            </EmptyCard>
        );
    }	
}