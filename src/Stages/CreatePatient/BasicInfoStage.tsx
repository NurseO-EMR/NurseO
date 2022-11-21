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
    const [height, setHeight] = useState<number>(breakUnitFromNumber("cm",patient?.height))
    const [weight, setWeight] = useState<number>(breakUnitFromNumber("kg",patient?.weight))
    const [diagnosis, setDiagnosis] = useState(patient?.diagnosis || "")
    
    const onNextClickHandler = ()=>{
        const basicInfo:BasicInfo = {
            name,
            dob,
            gender,
            height: height + "cm",
            weight: weight + "kg",
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
                </Select>
                <Input label="Height" suffix="cm" type="number" onChange={e=>setHeight(Number.parseInt(e.currentTarget.value))} value={height}/>
                <Input label="Weight" suffix="kg" type="number" step={0.5} onChange={e=>setWeight(Number.parseFloat(e.currentTarget.value))} value={weight}/> 
                <label className="block text-left">Diagnosis: </label>
                <textarea className="border w-full p-2" cols={45} rows={5} 
                    value={diagnosis} onChange={e=>setDiagnosis(e.currentTarget.value)} 
                />
        </BaseStage>
    )

}


function breakUnitFromNumber(unit:string, number?:string):number {
    if(!number) return 0;
    const split = number.split(unit);
    const convert = parseInt(split[0])
    return convert;
}

function convertDateToValue(date:string) {
    const stars = date.replaceAll("x","1");
    const d = new Date(stars);
    

    return `${d.getFullYear()}-${(d.getMonth()+1).toString().padStart(2,"0")}-${d.getDate().toString().padStart(2,"0")}`
}