import React, { ChangeEvent } from 'react';
import { Gender } from '../../../Types/Gender';
import { Allergy, CustomOrder, Flag, MedicalIssue, MedicationOrder, Note, PatientChart, Time } from '../../../Types/PatientProfile';
import ArmBand from '../../ArmBand/ArmBand';
import EmptyCard from '../../Dashboard/Card/EmptyCard';
import Input from '../../Form/Input';
import SelectInput from '../../Form/SelectInput';
import ComplexInput from '../../Form/ComplexInput';
import OrderInput from './Inputs/OrderInput';
import ReportInput from './Inputs/ReportInput';
import { StudentReport } from '../../../Types/Report';
import NotesEditor from './Inputs/NotesEditor';
import Database from '../../../Services/Database';
import Button from '../../Form/Button';


type Props = {
    patient?: PatientChart
    onSave?: (updatedPatient:PatientChart) => void
}
type State = PatientChart & {
    items:string,
    showPreview: boolean
}

export default class CreatePatient extends React.Component<Props,State> {

    private formRef:  React.RefObject<HTMLFormElement>;

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
            time: new Time(),
            allergies: [],
            medicalIssues: [],
            medicationOrders: [],
            flags: [],
            immunizations: [],
            studentReports: [],
            customOrders: [],
            notes: [],
            items: "",
            showPreview: false,
            studentUID: ""
        }

        this.formRef = React.createRef();
    }

    componentDidMount() {
        if(this.props.patient) {
            this.setState({
                ...this.props.patient
            })
        }
    }

    onOrderInput(updatedMedicalOrders: MedicationOrder[], updatedCustomOrders: CustomOrder[]) {
        this.setState({
            medicationOrders: updatedMedicalOrders,
            customOrders: updatedCustomOrders
        })
    }


    async savePatient() {
        const valid = this.formRef.current?.checkValidity();
        if(valid) {
            const {id, name, dob, age, gender, height, weight, time, allergies,
                medicalIssues, medicationOrders, customOrders, flags, immunizations,
                studentReports, notes, studentUID
            } = this.state;

            const patient = {id, name, dob, age, gender, height, weight, time, allergies,
                medicalIssues, medicationOrders, customOrders, flags, immunizations,
                studentReports, notes, studentUID}
            
            if(this.props.patient) {
                if(this.props.onSave) this.props.onSave(patient);
            } else {
                const db = Database.getInstance();
                await db.addTemplatePatient(patient);
            }

        } else {
            this.formRef.current?.reportValidity();
        }
    }

    onReportUpdate(studentReports: StudentReport[], notes: Note[]) {
        this.setState({studentReports, notes})
    }

    onDateChangeHandler(e: ChangeEvent<HTMLInputElement>) {
        const date = new Date(e.target.value);
        const now = new Date();
        const age = now.getFullYear() - date.getFullYear();
        this.setState({
            dob: e.target.value,
            age: age.toString()
        })
    }

    onPreviewClickHandler() {

        const {protocol, host} = window.location;
        const json = encodeURIComponent(JSON.stringify(this.state))
        const url = `${protocol}//${host}/studentView/Dashboard?preview=${json}`
        window.open(url)
    }

    onTimeChangeHandler(e:ChangeEvent<HTMLInputElement>) {
        const value = e.target.value;
        const splittedValue = value.split(":");
        const time:Time = {
            hour: Number.parseInt(splittedValue[0]),
            minutes: Number.parseInt(splittedValue[1])
        }
        this.setState({time});
    }

    public render() {	
        return (
            <div className="grid">
                <ArmBand patient={this.state} className="block m-auto"/>
                <EmptyCard title="Create Patient" className="block m-auto w-70vw" admin>
                        <form action='#' className="mx-28 py-5" ref={this.formRef} onSubmit={e=>e.preventDefault()}>
                            <Input admin id="id" onChange={e=>this.setState({id:e.currentTarget.value})} value={this.state.id}>Barcode ID</Input>
                            <Input admin id="name" onChange={e=>this.setState({name:e.currentTarget.value})} value={this.state.name}>Patient Name</Input>
                            <Input admin id="dob" type="date" onChange={this.onDateChangeHandler.bind(this)} value={this.state.dob}>Date of Birth</Input>
                            <Input admin id="age" onChange={e=>this.setState({age:e.currentTarget.value})} value={this.state.age}>Age</Input>
                            <SelectInput admin label="Gender" value={this.state.gender} onChange={e=>this.setState({gender:e.currentTarget.value as Gender})}>
                                <option value=""></option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </SelectInput>
                            <Input admin id="height" value={this.state.height} onChange={e=>this.setState({height:e.currentTarget.value})}>Height</Input>
                            <Input admin id="weight" value={this.state.weight} onChange={e=>this.setState({weight:e.currentTarget.value})}>Weight</Input>
                            <Input admin id="simTime" value={`${this.state.time.hour}:${this.state.time.minutes}`} type="time" onChange={this.onTimeChangeHandler.bind(this)}>Sim Time</Input>
                            <ComplexInput admin title="Allergies" onUpdate={allergies=>this.setState({allergies})} data={this.state.allergies} defaultType={new Allergy()}/>
                            <ComplexInput admin title="History" onUpdate={medicalIssues=>this.setState({medicalIssues})} data={this.state.medicalIssues} defaultType={new MedicalIssue()}/>
                            <ComplexInput admin title="Flags" onUpdate={flags=>this.setState({flags})} data={this.state.flags} defaultType={new Flag()}/>
                            <OrderInput admin onUpdate={this.onOrderInput.bind(this)} medicalOrders={this.state.medicationOrders} customOrders={this.state.customOrders!} />
                            <ReportInput admin studentReports={this.state.studentReports} notes={this.state.notes} reportType='studentVitalsReport' label='Vitals' onUpdate={this.onReportUpdate.bind(this)}/> 
                            <ReportInput admin studentReports={this.state.studentReports} notes={this.state.notes} reportType='studentAssessmentReport' label='Assessments' onUpdate={this.onReportUpdate.bind(this)}/> 
                            {this.state.notes.length > 0 ? <NotesEditor admin notes={this.state.notes} onUpdate={(notes)=>this.setState({notes})} /> : null } 

                            <div className='flex justify-center ml-40 mt-10'>
                                <Button admin>Clear</Button>
                                <Button admin onClick={this.onPreviewClickHandler.bind(this)}>Preview</Button>
                                <Button admin onClick={this.savePatient.bind(this)}>Save</Button>
                            </div>
                        </form>
                </EmptyCard>
            </div>
        );
    }	
}