import { faPills } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { find } from "lodash";
import { Settings, Medication,  MedicationLocation } from "nurse-o-core";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Card } from "../../Components/Card";
import { Button } from "../../Components/Form/Button";
import { Input } from "../../Components/Form/Input";
import { Select } from "../../Components/Form/Select";
import { Td } from "../../Components/Table/Td";
import { Tr } from "../../Components/Table/Tr";
import { Database } from "../../Services/Database";
import PageView from "../PageView";

type RouterState = {
    med: Medication
}

type ModifiableLocation = MedicationLocation & {
    [key: string]: string
}


export function EditMedPage() {
    const state = useLocation().state as RouterState;
    const oldMed = state.med
    const [id] = useState(oldMed.id)
    const [brandName, setBrandName] = useState(oldMed.brandName)
    const [genericName, setGenericName] = useState(oldMed.genericName)
    const [narcoticCount, setNarcoticCount] = useState(oldMed.narcoticCountNeeded ? "true" : "false")
    const [locations, setLocations] = useState(oldMed.locations as ModifiableLocation[])
    const [settings, setSetting] = useState<Settings>()

    useEffect(() => {
        async function getSettings() {
            const db = Database.getInstance()
            const settings = await db.getSettings();
            setSetting(settings)
        }
        getSettings()
    }, [])


    const onLocationChangeHandler = (index: number, key: string, value: string) => {
        locations[index][key] = value
        setLocations([...locations])
    }


    const onSaveClickHandler = () => {
        const newMed: Medication = {
            id,
            brandName,
            genericName,
            narcoticCountNeeded: narcoticCount === "true",
            locations
        }
        const db = Database.getInstance();
        db.updateMedication(newMed)
    }

    const onLocationDeleteHandler = (index:number)=>{
        locations.splice(index,1)
        setLocations([...locations])
    }


    return <PageView>
        <Card className="overflow-scroll">
            <FontAwesomeIcon className="block m-auto text-5xl text-blue" icon={faPills} />
            <h1 className="text-center text-2xl text-blue font-bold mt-4">Edit Medication</h1>
            <Input label="medID" value={id} disabled />
            <Input label="Brand Name" onChange={e => setBrandName(e.currentTarget.value)} value={brandName} />
            <Input label="Generic Name" onChange={e => setGenericName(e.currentTarget.value)} value={genericName} />
            <Select label="Does this medication require Narcotic count?" onChange={e => setNarcoticCount(e.currentTarget.value)} value={narcoticCount}>
                <option value="true">Yes</option>
                <option value="false">No</option>
            </Select>
            <table className="w-full">
                <thead>
                    <Tr>
                        <th className="border px-6">Building</th>
                        <th className="border px-6">Station</th>
                        <th className="border px-6">Drawer</th>
                        <th className="border px-6">Slot</th>
                        <th className="border px-6">Type</th>
                        <th className="border px-6">Dose</th>
                        <th className="border px-6">Barcode</th>
                        <th className="border px-6">Delete</th>
                    </Tr>
                </thead>
                <tbody>
                    {locations.map((l, i) => {
                        let location;
                        if (settings) location = find(settings.locations, { id: l.id })
                        return <Tr key={i}>
                            <Td>{location?.building || "Error"}</Td>
                            <Td>{location?.station || "Error"}</Td>
                            <Td><Input label="Drawer" hideLabel value={l.drawer} onChange={e => onLocationChangeHandler(i, "drawer", e.currentTarget.value)} /></Td>
                            <Td><Input label="Slot" hideLabel value={l.slot} onChange={e => onLocationChangeHandler(i, "slot", e.currentTarget.value)} /></Td>
                            <Td><Input label="Type" hideLabel value={l.type} onChange={e => onLocationChangeHandler(i, "type", e.currentTarget.value)} /></Td>
                            <Td><Input label="Dose" hideLabel value={l.dose} onChange={e => onLocationChangeHandler(i, "dose", e.currentTarget.value)} /></Td>
                            <Td><Input label="Barcode" hideLabel value={l.barcode} onChange={e => onLocationChangeHandler(i, "barcode", e.currentTarget.value)} /></Td>
                            <td><button className="bg-red text-white px-4 py-2 mx-auto w-full" onClick={()=>onLocationDeleteHandler(i)}>Delete</button></td>
                        </Tr>
                    })}
                </tbody>
            </table>

            <Button className="bg-blue my-6" onClick={onSaveClickHandler}>Save</Button>
        </Card>

    </PageView>
}