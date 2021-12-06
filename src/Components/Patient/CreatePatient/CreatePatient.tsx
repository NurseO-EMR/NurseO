import { uniqBy } from 'lodash';
import React from 'react';
import { Gender } from '../../../Types/Gender';
import { Allergy, PatientChart } from '../../../Types/PatientProfile';
import ArmBand from '../../ArmBand/ArmBand';
import AllergyCard from '../../Dashboard/Card/AllergyCard';
import EmptyCard from '../../Dashboard/Card/EmptyCard';
import FlagsCard from '../../Dashboard/Card/FlagsCard';
import MedicationCard from '../../Dashboard/Card/MedicationCard';
import Button from '../../Form/Button';
import Input from '../../Form/Input';
import SelectInput from '../../Form/SelectInput';
import AllergiesInput from './AllergiesInput';

type Props = {}
type State = PatientChart & {

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
            notes: [],
            studentReports: [],
            availableReportSets: [],
        }
    }

    onAllergySaveHandler(allergy:Allergy) {
        let {allergies} = this.state;
        allergies.push(allergy);
        allergies = uniqBy(allergies, "name")
        this.setState({allergies})
    }

    savePatient() {
        const patient = this.state;
        console.log(patient)
    }

    public render() {	
        return (
            <div className="grid grid-cols-6 grid-rows-6 max-h-screen">
                <ArmBand patient={this.state} className="col-span-6 row-span-1"/>
                <EmptyCard title="Create Patient" className="col-span-3 row-span-5">
                        <form>
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
                            <AllergiesInput onSave={this.onAllergySaveHandler.bind(this)} />
                            <Button onClick={this.savePatient.bind(this)}>Save</Button>
                        </form>
                </EmptyCard>
                <AllergyCard className="col-span-2" preview allergies={this.state.allergies}></AllergyCard>
                <FlagsCard className="col-span-1" preview flags={this.state.flags}></FlagsCard>
                <MedicationCard className="col-span-3" preview medications={this.state.medicationOrders}></MedicationCard>
            </div>
        );
    }	
}