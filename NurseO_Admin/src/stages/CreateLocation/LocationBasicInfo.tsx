import { faBuilding } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { Input } from "~/components/Form/Input";
import { BaseStage, type BaseStageProps } from "~/components/Stages/BaseStage";

export type Props = BaseStageProps & {
    onNext:(buildingName: string, stationName: string)=>void
};

export function LocationBasicInfoStage(props:Props) {
    const [buildingName, setBuildingName] = useState("");
    const [stationName, setStationName] = useState("");
    const [waiting, setWaiting] = useState(false)


    const onNextClickHandler = () => {
        setWaiting(true)
        props.onNext(buildingName, stationName)
    }






    return <BaseStage {...props} title="Location Info" icon={faBuilding} onNext={onNextClickHandler} customNextText={waiting ? "Loading..." : "Next"}>
        <Input label="Building Name" onChange={e=>setBuildingName(e.currentTarget.value)} value={buildingName} />
        <Input label="Station Name"  onChange={e=>setStationName(e.currentTarget.value)} value={stationName}/>
    </BaseStage>
}