import { faBuilding } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { Input } from "~/components/Admin/Form/Input";
import { Select } from "~/components/Admin/Form/Select";
import { BaseStage, type BaseStageProps } from "~/components/Admin/Stages/BaseStage";
import type { LocationDefinition } from "~/core/index";
import { api } from "~/utils/api";

export type Props = BaseStageProps & {
    onNext: (locationId: number, drawerName: string, slotName: string, dose: string, type: string, barcode: string) => void
};

export function MedLocationStage(props: Props) {

    const { data: locations } = api.setting.getLocations.useQuery()
    const [buildings, setBuildings] = useState([] as string[])
    const [stations, setStations] = useState([] as LocationDefinition[])
    const [locationId, setLocationID] = useState(-1);
    const [drawerName, setDrawerName] = useState("");
    const [slotName, setSlotName] = useState("");
    const [type, setType] = useState("");
    const [dose, setDose] = useState("");
    const [barcode, setBarcode] = useState("");

    const [loading, setLoading] = useState(false);



    useEffect(() => {
        if (!locations) return;
        let locationList = locations.map(l => l.building)
        locationList = [...new Set(locationList)]
        setBuildings(locationList)
    }, [locations])


    const onNextClickHandler = () => {
        setLoading(true)
        props.onNext(locationId, drawerName, slotName, dose, type, barcode);
    }

    const onBuildingSelected = (buildingName: string) => {
        const filteredStations = locations?.filter(l => l.building === buildingName)
        setStations(filteredStations ?? [])
    }


    return <BaseStage {...props} title="Where is it going?" icon={faBuilding} onNext={onNextClickHandler} customNextText={loading ? "Loading..." : "Add Medication"}>
        <div className="grid grid-cols-3 gap-x-8">
            <Select label="Building" onChange={e => onBuildingSelected(e.currentTarget.value)}>
                <option className="hidden"></option>
                <>{buildings.map((b, i) => <option value={b} key={i}>{b}</option>)}</>
            </Select>

            <Select label="Station" onChange={e => setLocationID(parseInt(e.currentTarget.value))} value={locationId}>
                <option className="hidden"></option>
                <>{stations.map((s, i) => <option value={s.id} key={i}>{s.station}</option>)}</>
            </Select>

            <Input label="Drawer Name" onChange={e => setDrawerName(e.currentTarget.value)} value={drawerName} placeholder="A1, A2, C2" />
            <Input label="Slot Name" onChange={e => setSlotName(e.currentTarget.value)} value={slotName} placeholder="slot 1, slot A, ...etc" />
            <Input label="Concentration" onChange={e => setDose(e.currentTarget.value)} value={dose} placeholder="20mg, 40mg, 20ml" />
            <Input label="Type" onChange={e => setType(e.currentTarget.value)} value={type} placeholder="tablet, pill, suppository, ...etc." />
            <Input label="Barcode" onChange={e => setBarcode(e.currentTarget.value)} value={barcode} />
        </div>
    </BaseStage>
}