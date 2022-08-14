import { useState, useEffect } from "react";
import { Card } from "../../Components/Card";
import { Td } from "../../Components/Table/Td";
import { Tr } from "../../Components/Table/Tr";
import { LocationDefinition } from "nurse-o-core";
import { Database } from "../../Services/Database";
import PageView from "../PageView";
import { findIndex } from "lodash";

export function ViewLocationsPage() {
    const [locations, setLocations] = useState<LocationDefinition[]>([])


    const getLocations = async () => {
        const db = Database.getInstance()
        const settings = await db.getSettings();
        const locations = settings.locations;
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
                            <Td>{l.building}</Td>
                            <Td>{String(l.station)}</Td>
                            <Td>{String(l.id)}</Td>
                            <td><button className="bg-red text-white px-4 py-2 mx-auto w-full" onClick={() => onDeleteClickHandler(l)}>Delete</button></td>
                        </Tr>
                    )}
                </tbody>
            </table>
        </Card>
    </PageView>
}