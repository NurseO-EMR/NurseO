import { useState, useEffect } from "react";
import { Card } from "../../Components/Card";
import { Td } from "../../Components/Table/Td";
import { Tr } from "../../Components/Table/Tr";
import { LocationDefinition } from "nurse-o-core";
import { Database } from "../../Services/Database";
import PageView from "../PageView";
import { findIndex } from "lodash";
import { Input } from "../../Components/Form/Input";
import { Button } from "../../Components/Form/Button";
import {ButtonWConfirmBox} from "../../Components/Form/ButtonWConfirmBox"

export function ViewLocationsPage() {
    const [locations, setLocations] = useState<LocationDefinition[]>([])
    const [saveText, setSaveText] = useState("Save")


    const getLocations = async () => {
        const db = Database.getInstance()
        const settings = await db.getSettings();
        const locations = settings.locations;
        locations.sort((a,b)=>a.building.localeCompare(b.building) + a.station.localeCompare(b.station))
        setLocations(locations)
    }

    useEffect(() => {
        getLocations()
    }, [])


    const onDeleteClickHandler = async (location: LocationDefinition) => {
        const db = Database.getInstance()
        const settings = await db.getSettings()
        const index = findIndex(settings.locations, {id: location.id})
        settings.locations.splice(index, 1)
        await db.updateSettings(settings)
        setLocations([...settings.locations])
    }

    const onBuildingEdit = (id:string, building: string) => {
        const index = findIndex(locations, {id})
        locations[index].building = building
    }

    const onStationEdit = (id:string, station: string) => {
        const index = findIndex(locations, {id})
        locations[index].station = station
    }

    const onSaveClickHandler = async () =>{
        setSaveText("Saving...")
        const db = Database.getInstance()
        const settings = await db.getSettings();
        settings.locations = locations
        await db.updateSettings(settings);
        setSaveText("Saved!")
        setTimeout(()=>setSaveText("Save"), 3000)
    }


    return <PageView>
        <Card>
            <h1 className="text-blue text-left font-bold text-lg pb-2">Locations:</h1>
            <table className="w-full">
                <thead>
                    <Tr>
                        <th className="border font-normal">Building</th>
                        <th className="border font-normal">Station</th>
                        <th className="border font-normal">ID</th>
                        <th className="border font-normal">Delete</th>
                    </Tr>
                </thead>
                <tbody>
                    {locations.map((l, i) =>
                        <Tr key={i}>
                            <Td className="w-28"><Input label="building name" hideLabel defaultValue={l.building} 
                            onChange={({target})=>onBuildingEdit(l.id, target.value)} /></Td>

                            <Td><Input label="station name" hideLabel defaultValue={l.station} 
                            onChange={({target})=>onStationEdit(l.id, target.value)} /></Td>

                            <Td>{String(l.id)}</Td>
                            <td><ButtonWConfirmBox className="bg-red text-white px-4 py-2 mx-auto w-full rounded-none" 
                            confirmPrompt={`Are you sure you want to delete ${l.building}-${l.station}? This will break any medication in that location`}
                            onConfirm={() => onDeleteClickHandler(l)}>Delete</ButtonWConfirmBox></td>
                        </Tr>
                    )}
                </tbody>
            </table>

            <Button className="bg-blue my-6" onClick={onSaveClickHandler}>{saveText}</Button>
        </Card>
    </PageView>
}