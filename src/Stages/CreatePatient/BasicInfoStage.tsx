import { faIdCard } from "@fortawesome/free-solid-svg-icons";
import { Input} from "../../Components/Form/Input";
import { Select } from "../../Components/Form/Select";
import { BaseStageProps, BaseStage } from "./../../Components/Stages/BaseStage"
import { Gender } from "../../Services/Core";
import { useState } from "react";


type BasicInfo = {
    name: string,
    dob: string,
    gender: Gender,
    height: string,
    weight: string
    
}

export type Props = BaseStageProps & {
    onNext:(basicInfo:BasicInfo)=>void
};

export function BasicInfoStage(props: Props) {
    const [name, setName] = useState("");
    const [dob, setDOB] = useState("")
    const [gender, setGender] = useState("" as Gender)
    const [height, setHeight] = useState(0)
    const [weight, setWeight] = useState(0)
    
    const onNextClickHandler = ()=>{
        const basicInfo:BasicInfo = {
            name,
            dob,
            gender,
            height: height + "cm",
            weight: weight + "kg",
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
                <Input label="Weight" suffix="kg" type="number"onChange={e=>setWeight(Number.parseInt(e.currentTarget.value))} value={weight}/> 
                              
        </BaseStage>
    )

}