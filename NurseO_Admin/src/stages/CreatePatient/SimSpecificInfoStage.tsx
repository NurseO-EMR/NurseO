import { faHouseChimneyUser } from "@fortawesome/free-solid-svg-icons";
import type { Course, PatientChart, Time } from "@nurse-o-core/index";
import { useEffect, useState, type ChangeEvent } from "react";
import { Announcement, broadcastAnnouncement } from "~/services/AnnouncementService";
import { Input } from "~/components/Form/Input";
import { Select } from "~/components/Form/Select";
import { type BaseStageProps, BaseStage } from "~/components/Stages/BaseStage"
import { DateFormat } from "~/services/DateFormat";
import { makeTimeObject, convertTimeToString } from "~/services/Util";
import { api } from "~/utils/api";


export type SimSpecificInfo = {
    id: string,
    age: string,
    dob: string,
    time: Time,
    labDocURL: string,
    imagingURL: string,
    courseId: number
}

export type Props = BaseStageProps & {
    onNext:(basicInfo:SimSpecificInfo)=>void,
    dob:string,
    patient?:PatientChart

};

export function SimSpecificInfoStage(props: Props) {

    const [barcode, setBarcode] = useState(props.patient?.id ?? "")
    const [age, setAge] = useState(props.patient?.age ?? "")
    const [dateFormat, setDateFormat] = useState(props.patient ? getDateFormat(props.patient.dob) : "" as DateFormat)
    const [simTime, setSimTime] = useState(props.patient ? convertTimeToString(props.patient.time) : "")
    const [labsURL, setLabsURL] = useState(props.patient?.labDocURL ?? "")
    const [imagingURL, setImagingURL] = useState(props.patient?.imagingURL ?? "")
    const [courseId, setCourseId] = useState(props.patient?.courseId ?? -1)
    const {data: courses} = api.setting.getCourses.useQuery()

    const onNextClickHandler = ()=>{
        const simInfo:SimSpecificInfo = {
            id: barcode,
            age: age,
            dob: changeDOBFormat(props.dob, dateFormat),
            time: makeTimeObject(simTime),
            labDocURL: labsURL,
            imagingURL: imagingURL,
            courseId
        }

        props.onNext(simInfo)
    }

    const onBlurURLChangeHandler = (e:ChangeEvent<HTMLInputElement>, setterFunction: (value:string)=>void)=>{
        let value = e.currentTarget.value
        if(value.indexOf("preview") === -1 && value.indexOf("view") > -1) {
            value = value.replace("view", "preview")
        } else if (value.indexOf("preview") === -1 && value !== "") {
            broadcastAnnouncement("The labs url is not correct, the url should end either in /view or /preview and the file should be PDF", Announcement.error)
        }

        setterFunction(value)
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
            <Select label="Course"  onChange={e=>setCourseId(parseInt(e.currentTarget.value))} value={courseId}>
                    <option className="hidden"></option>
                    <>{courses?.map((c,i)=><option key={i} value={c.id}>{c.name}</option>)}</>
            </Select>
            <Input label="Labs URL" optional type="url"  onChange={e=>setLabsURL(e.currentTarget.value)} onBlur={e=>onBlurURLChangeHandler(e,setLabsURL)} value={labsURL}/>
            <Input label="Imaging URL" optional type="url"  onChange={e=>setImagingURL(e.currentTarget.value)} onBlur={e=>onBlurURLChangeHandler(e,setImagingURL)} value={imagingURL}/>
        </BaseStage>
    )

}


function changeDOBFormat(dob: string, format: DateFormat) {
    if(dob === "") return dob;
    if(format === DateFormat.NothingHidden) return dob;
    const splitedByDate = dob.split("-")
    let year = splitedByDate[0]
    const day = splitedByDate[2];
    let month = splitedByDate[1];
    if(format === DateFormat.HiddenYear) year = "xxxx"
    if(format === DateFormat.HiddenMonthNYear) {
        year = "xxxx"
        month = "xx"
    }

    const joined = `${month}/${day}/${year}`
    return joined
}




function getDateFormat(dob: string):DateFormat {
    let numberOfXs = 0;
    for(const letter of dob) {
        if(letter === "x") numberOfXs++;
    }
    
    if(numberOfXs === 0) return DateFormat.NothingHidden;
    else if(numberOfXs === 4) return DateFormat.HiddenYear;
    else if(numberOfXs === 6) return DateFormat.HiddenMonthNYear;
    else return DateFormat.NothingHidden
}