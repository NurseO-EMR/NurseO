import { faHouseChimneyUser } from "@fortawesome/free-solid-svg-icons";
import { PatientChart, Time } from "nurse-o-core";
import { useState } from "react";
import { Input } from "../../Components/Form/Input";
import { Select } from "../../Components/Form/Select";
import { BaseStageProps, BaseStage } from "../../Components/Stages/BaseStage"
import { DateFormat } from "../../Services/DateFormat";


export type SimSpecificInfo = {
    id: string,
    age: string,
    dob: string,
    time: Time,
    labDocURL: string
}

export type Props = BaseStageProps & {
    onNext:(basicInfo:SimSpecificInfo)=>void,
    dob:string,
    patient?:PatientChart

};

export function SimSpecificInfoStage(props: Props) {

    const [barcode, setBarcode] = useState(props.patient?.id || "")
    const [age, setAge] = useState(props.patient?.age || "")
    const [dateFormat, setDateFormat] = useState("" as DateFormat)
    const [simTime, setSimTime] = useState("")
    const [labsURL, setLabsURL] = useState(props.patient?.labDocURL || "")


    const onNextClickHandler = ()=>{
        const simInfo:SimSpecificInfo = {
            id: barcode,
            age: age,
            dob: changeDOBFormat(props.dob, dateFormat),
            time: makeTimeObject(simTime),
            labDocURL: labsURL
        }

        props.onNext(simInfo)
    }


    return (
        <BaseStage {...props} title="Let's focus on sim now!" icon={faHouseChimneyUser} onNext={onNextClickHandler}>
            <Input label="Barcode" onChange={e=>setBarcode(e.currentTarget.value)} value={barcode}/>
            <Input label="Age"  onChange={e=>setAge(e.currentTarget.value)} value={age}/>
            <Select label="Date Format"  onChange={e=>setDateFormat(e.currentTarget.value as DateFormat)} value={dateFormat}>
                <option className="hidden"></option>
                <option value={DateFormat.NothingHidden}>01/24/1988</option>
                <option value={DateFormat.HiddenYear}>01/24/xxxx</option>
                <option value={DateFormat.HiddenMonthNYear}>xx/24/xxxx</option>
            </Select>
            <Input label="SimTime" type="time"  onChange={e=>setSimTime(e.currentTarget.value)} value={simTime}/>
            <Input label="Labs URL" optional type="url"  onChange={e=>setLabsURL(e.currentTarget.value)} value={labsURL}/>
        </BaseStage>
    )

}


function changeDOBFormat(dob: string, format: DateFormat) {
    if(dob === "") return dob;
    if(format === DateFormat.NothingHidden) return dob;
    const splitedByDate = dob.split("/")
    if(format === DateFormat.HiddenYear) splitedByDate[2] = "xxxx"
    if(format === DateFormat.HiddenMonthNYear) {
        splitedByDate[2] = "xxxx"
        splitedByDate[0] = "xx"
    }

    const joined = splitedByDate.join("/")
    return joined
}


function makeTimeObject(timeString: string) {
    const splited = timeString.split(":");
    const output: Time = {
        hour: Number.parseInt(splited[0]),
        minutes: Number.parseInt(splited[1]),
    }
    return output
}