import React from 'react';
import { Gender } from '../../../Types/Gender';
import { Allergy, Flag, MedicalIssue, PatientChart } from '../../../Types/PatientProfile';
import ArmBand from '../../ArmBand/ArmBand';
import EmptyCard from '../../Dashboard/Card/EmptyCard';
import Button from '../../Form/Button';
import Input from '../../Form/Input';
import SelectInput from '../../Form/SelectInput';
import ComplexInput from '../../Form/ComplexInput';
import OrderInput from './Inputs/OrderInput';
import SubmitButton from '../../Form/SubmitButton';

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


    savePatient() {
        const patient = this.state as PatientChart;
        console.log(patient)
    }

    public render() {	
        return (
            <div className="grid">
                <ArmBand patient={this.state} className=""/>
                <EmptyCard title="Create Patient" className="" preview>
                        <form className="mx-28" onSubmit={this.savePatient.bind(this)}>
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
                            <OrderInput onUpdate={console.log} medicalOrders={this.state.medicationOrders} customOrders={this.state.customOrders!}>

                            </OrderInput>
                            <SubmitButton label='Save' />
                        </form>
                </EmptyCard>
            </div>
        );
    }	
}