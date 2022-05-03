import { Input } from "./../../Components/Form/Input";
import { useEffect, useState } from "react";
import ButtonWModalPrompt from "../../Components/Form/ButtonWModalPrompt";
import ListItem from "../../Components/ListItem";
import { MedicationLocation } from "../../Services/Core";
import { Database } from "../../Services/Database";
import PageView from "../PageView";
import { Cart } from "./Cart/Cart";
import { Button } from "./../../Components/Form/Button";

export default function CreateLocationPage() {
    const db = Database.getInstance();
    const [locationList, setLocationList] = useState<MedicationLocation[]>([]);
    const [buildingName, setBuildingName] = useState("");


    useEffect(() => {
        async function getBuildings() {
            const buildings = await db.getLocations();
            setLocationList(buildings);
        }
        getBuildings();

    }, [buildingName, setLocationList, db])


    const onNursingStationAddedHandler = async (nursingStationName: string) => {
        console.log("here")

        const location: MedicationLocation = {
            building: buildingName,
            station: nursingStationName,
            supply: [],
            narcoticCountNeeded: false
        }
        locationList.push(location);
        setLocationList(locationList);
        await db.addLocation(location);
    }

    return (
        <PageView>
            <form onSubmit={e => e.preventDefault()} className="grid grid-flow-col justify-evenly">
                <div>
                    <Input>Building</Input>
                    <Input>Station name</Input>
                    <Input>Number of rows</Input>
                    <Input>Max number of drawers per row</Input>
                    <Button>Submit</Button>
                </div>
                <Cart />

                {/* <ul>
                    {locationList.map((loc,i)=>
                        <ListItem key={i}>{loc.building} - {loc.station}</ListItem>)}
                </ul> */}
            </form>
        </PageView>

    );
}