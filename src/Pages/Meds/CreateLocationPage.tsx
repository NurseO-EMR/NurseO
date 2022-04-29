import { Input } from "nurse-o-core";
import React, { useEffect, useState } from "react";
import ButtonWModalPrompt from "../../Components/Form/ButtonWModalPrompt";
import ListItem from "../../Components/ListItem";
import { MedicationLocation } from "../../Services/Core";
import { Database } from "../../Services/Database";
import PageView from "../PageView";

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
    
    },[buildingName, setLocationList, db])


    const onNursingStationAddedHandler = async (nursingStationName: string)=>{
        console.log("here")

        const location:MedicationLocation = {
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
            <form onSubmit={e => e.preventDefault()} className="">
                <Input id='locationBuilding' className='grid-flow-col'
                    onChange={e => setBuildingName(e.currentTarget.value)}>Building</Input>
                <ButtonWModalPrompt onSubmit={onNursingStationAddedHandler} inputLabel='Nursing Station Name'>
                    Add nursing station
                </ButtonWModalPrompt>

                <ul>
                    {locationList.map((loc,i)=>
                        <ListItem key={i}>{loc.building} - {loc.station}</ListItem>)}
                </ul>
            </form>
        </PageView>

    );
}