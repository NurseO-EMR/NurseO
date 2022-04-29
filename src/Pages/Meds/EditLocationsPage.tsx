import { useState, useEffect } from "react";
import ListItem from "../../Components/ListItem";
import { MedicationLocation } from "../../Services/Core";
import { Database } from "../../Services/Database";
import PageView from "../PageView";

export default function EditLocationsPage() {

    const db = Database.getInstance();
    const [locationList, setLocationList] = useState<MedicationLocation[]>([]);


    useEffect(() => {
        async function getBuildings() {
            const buildings = await db.getLocations();
            setLocationList(buildings);
        }
        getBuildings();

    }, [setLocationList, db])



    return (
        <PageView>
            <ul>
                {locationList.map((loc, i) => <ListItem key={i}>{loc.building} - {loc.station}</ListItem>)}
            </ul>
        </PageView>
    );

}