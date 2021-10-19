import React, { ChangeEvent } from 'react';
import { Subscription } from 'rxjs';
import Database from '../../Services/Database';
import { $error, $patient, $settings, $vitalsSet } from '../../Services/State';
import { PatientChart } from '../../Types/PatientProfile';
import { Settings } from '../../Types/Settings';
import { Status } from '../../Types/Status';
import { StudentVitalsReport, VitalsSet } from '../../Types/Vitals';
import EmptyCard from '../Dashboard/Card/EmptyCard';
import TableHeader from '../TableHeader';
import VitalsHeaderTimeSlots from './VitalsHeaderTimeSlots';
import VitalsInput from './VitalsInput';

type Props =  React.HTMLAttributes<HTMLDivElement> &  {
    patient: PatientChart
}

type State = {
    vitalsSets: VitalsSet[] | null,
    settings: Settings,
    date: string,
    saveButtonText: string,
    status: Status,
    timeSlots: Array<string>,
}

export default class VitalsSubmitter extends React.Component<Props, State> {


    private subscriptions: Subscription[]

    constructor(props:Props) {
        super(props);
        this.state = {
            vitalsSets: null,
            settings: null,
            date: this.getTodaysDate(),
            saveButtonText: "Save",
            status: "completed",
            timeSlots: [],
        }

        this.subscriptions = [];
    }

    componentDidMount() {
        const vitalsSubscription =  $vitalsSet.subscribe(vitalsSets=>this.setState({
            vitalsSets
        }))

        const settingsSubscription = $settings.subscribe(settings=>this.setState({
            settings
        }))

        this.subscriptions.push(vitalsSubscription);
        this.subscriptions.push(settingsSubscription);

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

    onInputChangeHandler(filedName: string, timeSlotIndex: number, value: string, vitalSetIndex: number) {
        
        const patient = $patient.value;
        if(patient === undefined) $error.next("pease scan patient barcode"); 
        if(patient!.studentVitals === undefined) patient!.studentVitals = [];
        
        const updatedVitals = {
            setName: this.state.vitalsSets![vitalSetIndex].name,
            time: this.state.timeSlots[timeSlotIndex],
            value: value,
            vitalName: filedName,
            date: this.state.date
        }

        const vitalsIndex= this.getVitalsIndex(patient!.studentVitals, updatedVitals);
        if(vitalsIndex>-1) {
            patient!.studentVitals[vitalsIndex].value=updatedVitals.value;
        } else {
            patient?.studentVitals.push(updatedVitals)
        }

        $patient.next(patient);
        
    }

    getVitalsIndex(vitalsReport:StudentVitalsReport[], vital: StudentVitalsReport):number {
        for(let i = 0; i<vitalsReport.length; i++) {
            const vitalItem = vitalsReport[i];
            if(vitalItem.setName !== vital.setName) continue;
            if(vitalItem.vitalName !== vital.vitalName) continue;
            if(vitalItem.time !== vital.time) continue;
            return i;
        }
        return -1;
    }

    onTimeSlotChanges(timeSlots:Array<string>){
        this.setState({timeSlots})
    }
    public render() {	
        return (
            <EmptyCard title="Vitals" className="mx-2 border-l-8 border-r-8">
                <div className="px-28">
                    <div className="flex justify-between px-8 pt-4">
                        <div>
                            <label className="font-bold">Date: </label>
                            <input value={this.state.date} onChange={this.onDateChangeHandler.bind(this)} className="border-2 text-center" type="Date" />
                        </div>
                        <button onClick={this.saveOnClickHandler.bind(this)} className="bg-red-600 text-white rounded-full px-8 py-1">{this.state.saveButtonText}</button>
                    </div>
                    
                    {this.state.vitalsSets?.map((val,i)=>{
                        return (
                            <div key={i}>
                                <TableHeader>{val.name}</TableHeader>
                                <table className="w-full">
                                    <thead>
                                        <VitalsHeaderTimeSlots onChange={this.onTimeSlotChanges.bind(this)} numberOfTimeSlots={this.state.settings?.numberOfTimeSlots}></VitalsHeaderTimeSlots>
                                    </thead>

                                    <tbody>
                                        {val.vitals.map((val, j)=>
                                            <VitalsInput 
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