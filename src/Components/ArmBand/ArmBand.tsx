import React from 'react';
import { startCase } from 'lodash';
import { PatientChart, Time } from '../../Types/PatientProfile';
import SectionNamedInfo from './SectionNamedInfo';
import logo from "./../../assets/logo.png"
import { $patient } from '../../Services/State';



type Props=React.HTMLAttributes<HTMLDivElement> & {
    patient: PatientChart
}
type State = {
    time: Time
}
export default class ArmBand extends React.Component<Props,State> {

    constructor(props:Props) {
        super(props);
        this.state = {
            time: $patient.value?.time
        }
    }

    public render() {	
        return (
            <div className={`${this.props.className} grid justify-center`}>
                <div className={`text-secondary text-xl grid grid-rows-2 grid-cols-5 gap-8 items-center py-4`}>
                    <SectionNamedInfo name="" boldedValue={true}
                    valueClassNames="text-3xl "
                    removeColon={true}
                    >{this.props.patient?.name}</SectionNamedInfo>

                    <SectionNamedInfo name="DOB">{this.props.patient?.dob}</SectionNamedInfo>
                    <SectionNamedInfo name="Age">{this.props.patient?.age}</SectionNamedInfo>
                    <SectionNamedInfo name="Gender">{startCase(this.props.patient?.gender)}</SectionNamedInfo>
                    <div className="w-1/2 h-6 grid justify-center items-center p-0">
                        <img src={logo} className="max-h-14" alt="logo" />
                    </div>
                    <SectionNamedInfo name="Allergies" boldedValue={true}>
                        {this.props.patient.allergies.length === 0 ? "NKDA" : this.props.patient?.allergies.map(allergy=>allergy.name+", ") }
                    </SectionNamedInfo>
                    <SectionNamedInfo name="Flags" boldedValue={true}>
                        {this.props.patient.flags.length === 0 ? "None" : this.props.patient?.flags.map(flag=>flag.name+" ")}
                    </SectionNamedInfo>
                    <SectionNamedInfo name="Height">{this.props.patient?.height} cm</SectionNamedInfo>
                    <SectionNamedInfo name="Weight">{this.props.patient?.weight} kg</SectionNamedInfo>
                    <SectionNamedInfo name="Sim Time">{this.state.time.hour}:{this.state.time.minutes}</SectionNamedInfo>

                </div>
            </div>
        );
    }	
}