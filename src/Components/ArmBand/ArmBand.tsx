import React from 'react';
import { PatientChart } from '../../Types/PatientProfile';
import SectionNamedInfo from './SectionNamedInfo';
import logo from "./../../assets/logo.png"


type Props=React.HTMLAttributes<HTMLDivElement> & {
    patient: PatientChart
}
type State = {}
export default class ArmBand extends React.Component<Props,State> {

    public render() {	
        return (
            <div className="text-secondary text-xl grid grid-rows-2 grid-cols-5 px-40 w-full justify-center items-center h-28">
                <SectionNamedInfo name="" boldedValue={true}
                valueClassNames="text-3xl "
                removeColon={true}
                >{this.props.patient?.name}</SectionNamedInfo>

                <SectionNamedInfo name="DOB">{this.props.patient?.dob.toString().slice(4,15)}</SectionNamedInfo>
                <SectionNamedInfo name="Age">{this.props.patient?.age}</SectionNamedInfo>
                <SectionNamedInfo name="Gender">{this.props.patient?.gender}</SectionNamedInfo>
                <div className="w-1/2 h-6 grid justify-center items-center p-0"><img src={logo} className="h-14" alt="logo" /></div>
                <SectionNamedInfo name="Allergies" boldedValue={true}>
                    {this.props.patient?.allergies.map(allergy=>allergy.name+", ")}
                </SectionNamedInfo>
                <SectionNamedInfo name="Flags" boldedValue={true}>
                    {this.props.patient?.flags.map(flag=>flag.name+" ")}
                </SectionNamedInfo>
                <SectionNamedInfo name="Height">{this.props.patient?.height}</SectionNamedInfo>
                <SectionNamedInfo name="Weight">{this.props.patient?.weight}</SectionNamedInfo>
                <SectionNamedInfo name="Sim Time">{new Date().getHours().toString().padStart(2,"0")}:{new Date().getMinutes().toString().padStart(2,"0")}</SectionNamedInfo>

            </div>
        );
    }	
}