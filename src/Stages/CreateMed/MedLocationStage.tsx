import { faBuilding } from "@fortawesome/free-solid-svg-icons";
import { filter, map, uniq } from "lodash";
import { useEffect, useState } from "react";
import { Input } from "../../Components/Form/Input";
import { Select } from "../../Components/Form/Select";
import { BaseStage, BaseStageProps } from "../../Components/Stages/BaseStage";
import { LocationDefinition } from "../../Services/Core";
import { Database } from "../../Services/Database";

export type Props = BaseStageProps & {
    onNext: (locationId: string, drawerName: string, slotName: string, dose:string, type:string, barcode: string) => void
};

export function MedLocationStage(props: Props) {

    const [locations, setLocations] = useState([] as LocationDefinition[])
    const [buildings, setBuildings] = useState([] as string[])
    const [stations, setStations] = useState([] as LocationDefinition[])
    const [locationId, setLocationID] = useState("");
    const [drawerName, setDrawerName] = useState("");
    const [slotName, setSlotName] = useState("");
    const [type, setType] = useState("");
    const [dose, setDose] = useState("");
    const [barcode, setBarcode] = useState("");
    


    useEffect(() => {
        async function getLocations() {
            const db = Database.getInstance();
            const settings = await db.getSettings();
            const buildings = uniq(map(settings.locations, "building"))
            setBuildings(buildings)
            setLocations(settings.locations);
        }
        getLocations();
    }, [])


    const onNextClickHandler = () => {
        props.onNext(locationId,drawerName, slotName,dose, type, barcode);
    }

    const onBuildingSelected = (buildingName:string)=>{
        const filteredStations = filter(locations,{building: buildingName})
        setStations(filteredStations)
    }


    return <BaseStage {...props} title="Where is it going?" icon={faBuilding} onNext={onNextClickHandler} customNextText="Add Medication">
        <div className="grid grid-cols-3 gap-x-8">
            <Select label="Building" onChange={e=>onBuildingSelected(e.currentTarget.value)}>
                <option></option>
                <>{buildings.map((b, i) => <option value={b} key={i}>{b}</option>)}</>
            </Select>

            <Select label="Station" onChange={e=>setLocationID(e.currentTarget.value)} value={locationId}>
                {stations.map((s, i) => <option value={s.id} key={i}>{s.station}</option>)}
            </Select>

            <Input label="Drawer Name" onChange={e=>setDrawerName(e.currentTarget.value)} value={drawerName} placeholder="A1, A2, C2"/>
            <Input label="Slot Name" onChange={e=>setSlotName(e.currentTarget.value)} value={slotName} placeholder="slot 1, slot A, ...etc"/>
            <Input label="Dose" onChange={e => setDose(e.currentTarget.value)} value={dose} placeholder="20mg, 40mg, 20ml"/>
            <Input label="Type" onChange={e => setType(e.currentTarget.value)} value={type} placeholder="tablet, pill, suppository, ...etc."/>
            <Input label="Barcode" onChange={e => setBarcode(e.currentTarget.value)} value={barcode} />
        </div>
    </BaseStage>
}