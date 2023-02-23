import { faIdCard } from "@fortawesome/free-solid-svg-icons";
import { Input} from "../../Components/Form/Input";
import { Select } from "../../Components/Form/Select";
import { BaseStageProps, BaseStage } from "./../../Components/Stages/BaseStage"
import { Gender, PatientChart } from "nurse-o-core";
import { useState } from "react";


export type BasicInfo = {
    name: string,
    dob: string,
    gender: Gender,
    height: string,
    weight: string
    diagnosis: string
}

export type Props = BaseStageProps & {
    onNext:(basicInfo:BasicInfo)=>void
    patient?:PatientChart
};

export function BasicInfoStage(props: Props) {
    const {patient} = props;

    const [name, setName] = useState(patient?.name || "");
    const [dob, setDOB] = useState(patient? convertDateToValue(patient.dob)  : "")
    const [gender, setGender] = useState(patient?.gender || "" as Gender)
    const [height, setHeight] = useState<string>(patient?.height || "0")
    const [weight, setWeight] = useState<string>(patient?.weight || "0")
    const [diagnosis, setDiagnosis] = useState(patient?.diagnosis || "")
    
    const onNextClickHandler = ()=>{
        const basicInfo:BasicInfo = {
            name,
            dob,
            gender,
            height: height,
            weight: weight,
            diagnosis
        }
        props.onNext(basicInfo)
    }


    return (
        <BaseStage {...props} title="Let`s collect some basic information about your patient" icon={faIdCard} onNext={onNextClickHandler}>
                <Input label="Name" onChange={e=>setName(e.currentTarget.value)} value={name} />
                <Input label="Date of birth" type="date" onChange={e=>setDOB(e.currentTarget.value)} value={dob}/>
                <Select label="Gender" onChange={e=>setGender(e.currentTarget.value as Gender)} value={gender}>
                    <option className="hidden"></option>
                    <option value={Gender.Male}>Male</option>
                    <option value={Gender.Female}>Female</option>
                    <option value={Gender.Other}>Other</option>
                    <option value={Gender.Empty}></option>
                </Select>
                <Input label="Height"  onChange={e=>setHeight(e.currentTarget.value)} value={height}/>
                <Input label="Weight" onChange={e=>setWeight(e.currentTarget.value)} value={weight}/> 
                <label className="block text-left">Diagnosis: </label>
                <textarea className="border w-full p-2" cols={45} rows={5} 
                    value={diagnosis} onChange={e=>setDiagnosis(e.currentTarget.value)} 
                />
        </BaseStage>
    )

}


function convertDateToValue(date:string) {
    const stars = date.replaceAll("x","1");
    const d = new Date(stars);
    return `${d.getFullYear()}-${(d.getMonth()+1).toString().padStart(2,"0")}-${d.getDate().toString().padStart(2,"0")}`
}