import React from 'react';
import { Gender } from '../../../Types/Gender';
import { Allergy, CustomOrder, Flag, MedicalIssue, MedicationOrder, Note, PatientChart } from '../../../Types/PatientProfile';
import ArmBand from '../../ArmBand/ArmBand';
import EmptyCard from '../../Dashboard/Card/EmptyCard';
import Input from '../../Form/Input';
import SelectInput from '../../Form/SelectInput';
import ComplexInput from '../../Form/ComplexInput';
import OrderInput from './Inputs/OrderInput';
import SubmitButton from '../../Form/SubmitButton';
import ReportInput from './Inputs/ReportInput';
import { StudentReport } from '../../../Types/Report';
import NotesEditor from './Inputs/NotesEditor';

type Props = {
}
type State = PatientChart & {
    items:string
}

export default class CreatePatient extends React.Component<Props,State> {

    constructor(props:Props) {
        super(props);
        this.state = {
            id: "",
            name: "",
            dob: "",
            age: "",
            gender: 'other',
            height: "",
            weight: "",
            time: "",
            allergies: [],
            medicalIssues: [],
            medicationOrders: [],
            flags: [],
            immunizations: [],
            studentReports: [],
            items: "",
            customOrders: [],
            notes: []
        }
    }

    onOrderInput(updatedMedicalOrders: MedicationOrder[], updatedCustomOrders: CustomOrder[]) {
        this.setState({
            medicationOrders: updatedMedicalOrders,
            customOrders: updatedCustomOrders
        })
    }


    savePatient() {
        const patient = this.state as PatientChart;
        console.log(patient)
    }

    onReportUpdate(studentReports: StudentReport[], notes: Note[]) {
        this.setState({studentReports, notes})
    }

    public render() {	
        return (
            <div className="grid">
                <ArmBand patient={this.state} className=""/>
                <EmptyCard title="Create Patient" className="" preview>
                        <form action='#' className="mx-28" onSubmit={this.savePatient.bind(this)}>
                            <Input id="id" onChange={e=>this.setState({id:e.currentTarget.value})}>Barcode ID</Input>
                            <Input id="name" onChange={e=>this.setState({name:e.currentTarget.value})}>Patient Name</Input>
                            <Input id="dob" type="date" onChange={e=>this.setState({dob:e.currentTarget.value})}>Date of Birth</Input>
                            <Input id="age" onChange={e=>this.setState({age:e.currentTarget.value})}>Age</Input>
                            <SelectInput label="Gender" onChange={e=>this.setState({gender:e.currentTarget.value as Gender})}>
                                <option value=""></option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </SelectInput>
                            <Input id="height" onChange={e=>this.setState({height:e.currentTarget.value})}>Height</Input>
                            <Input id="weight" onChange={e=>this.setState({weight:e.currentTarget.value})}>Weight</Input>
                            <Input id="simTime" type="time" onChange={e=>this.setState({time:e.currentTarget.value})}>Sim Time</Input>
                            <ComplexInput title="Allergies" onUpdate={allergies=>this.setState({allergies})} data={this.state.allergies} defaultType={new Allergy()}/>
                            <ComplexInput title="History" onUpdate={medicalIssues=>this.setState({medicalIssues})} data={this.state.medicalIssues} defaultType={new MedicalIssue()}/>
                            <ComplexInput title="Flags" onUpdate={flags=>this.setState({flags})} data={this.state.flags} defaultType={new Flag()}/>
                            <OrderInput onUpdate={this.onOrderInput.bind(this)} medicalOrders={this.state.medicationOrders} customOrders={this.state.customOrders!} />
                            <ReportInput studentReports={this.state.studentReports} notes={this.state.notes} reportType='studentVitalsReport' label='Vitals' onUpdate={this.onReportUpdate.bind(this)}/> 
                            <ReportInput studentReports={this.state.studentReports} notes={this.state.notes} reportType='studentAssessmentReport' label='Assessments' onUpdate={this.onReportUpdate.bind(this)}/> 
                            {this.state.notes.length > 0 ? <NotesEditor notes={this.state.notes} onUpdate={(notes)=>this.setState({notes})} /> : null } 
                            <SubmitButton label='Save' />
                        </form>
                </EmptyCard>
            </div>
        );
    }	
}