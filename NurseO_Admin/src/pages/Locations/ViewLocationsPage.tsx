import { useState, useEffect } from "react";
import { Card } from "~/components/Card";
import { Td } from "~/components/Table/Td";
import { Tr } from "~/components/Table/Tr";
import { LocationDefinition } from "@nurse-o-core/index";
import { Database } from "~/services/Database";
import PageView from "../_PageView";
import { findIndex } from "lodash";
import { Input } from "~/components/Form/Input";
import { Button } from "~/components/Form/Button";
import {ButtonWConfirmBox} from "~/components/Form/ButtonWConfirmBox"
import { CourseEditorModal } from "~/components/Courses/CourseEditorModal";
import { Announcement, broadcastAnnouncement } from "~/services/AnnouncementService";

export function ViewLocationsPage() {
    const [locations, setLocations] = useState<LocationDefinition[]>([])
    const [saveText, setSaveText] = useState("Save")
    const [locationIndexToBeEdited, setLocationIndexToBeEdited] = useState<number|null>(null)
    const db = Database.getInstance()


    const getLocations = async () => {
        const db = Database.getInstance()
        const settings = await db.getSettings();
        let locations = settings.locations;
        locations = locations.sort((a,b)=>a.building.localeCompare(b.building))
        setLocations([...locations])
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
        const locations = settings.locations
        setLocations([...locations])
    }

    const onBuildingEdit = (id:string, building: string) => {
        const index = findIndex(locations, {id})
        locations[index].building = building
        setLocations([...locations])
    }

    const onStationEdit = (id:string, station: string) => {
        const index = findIndex(locations, {id})
        locations[index].station = station
        setLocations([...locations])
    }

    const onSaveClickHandler = async () =>{
        setSaveText("Saving...")
        const settings = await db.getSettings();
        settings.locations = locations
        await db.updateSettings(settings);
        setSaveText("Saved!")
        setTimeout(()=>setSaveText("Save"), 3000)
    }

    const onCoursesSaveClickHandler = async (courseIds: string[])=>{
        if(locationIndexToBeEdited === undefined || locationIndexToBeEdited === null) {
            broadcastAnnouncement("Error occurred while saving the courses", Announcement.error)
            return
        }

        const settings = await db.getSettings();
        settings.locations[locationIndexToBeEdited].courseIds = courseIds
        await db.updateSettings(settings)
        setLocationIndexToBeEdited(null)
    }


    return <PageView>
        <Card className="overflow-auto">
            <h1 className="text-blue text-left font-bold text-lg pb-2">Locations:</h1>
            <table className="w-full">
                <thead>
                    <Tr>
                        <th className="border font-normal">Building</th>
                        <th className="border font-normal">Station</th>
                        <th className="border font-normal">ID</th>
                        <th className="border font-normal">Courses</th>
                        <th className="border font-normal">Delete</th>
                    </Tr>
                </thead>
                <tbody>
                    {locations.map((l, i) =>
                        <Tr key={i}>
                            <Td className="w-28"><Input label="building name" hideLabel value={l.building} 
                            onChange={({target})=>onBuildingEdit(l.id, target.value)} /></Td>

                            <Td><Input label="station name" hideLabel value={l.station} 
                            onChange={({target})=>onStationEdit(l.id, target.value)} /></Td>

                            <Td>{String(l.id)}</Td>
                            <td className="min-w-[9rem]"><Button className="bg-blue text-white px-4 py-2 rounded-none" onClick={()=>setLocationIndexToBeEdited(i)}>Edit Courses</Button></td>
                            <td><ButtonWConfirmBox className="bg-red text-white px-4 py-2 mx-auto w-full rounded-none" 
                            confirmPrompt={`Are you sure you want to delete ${l.building}-${l.station}? This will break any medication in that location`}
                            onConfirm={() => onDeleteClickHandler(l)}>Delete</ButtonWConfirmBox></td>
                        </Tr>
                    )}
                </tbody>
            </table>

            <Button className="bg-blue my-6" onClick={onSaveClickHandler}>{saveText}</Button>
        </Card>
        {locationIndexToBeEdited !== null ? <CourseEditorModal 
                                    courseIds={locations[locationIndexToBeEdited].courseIds}
                                    onSave={onCoursesSaveClickHandler}
                                    onClose={()=>setLocationIndexToBeEdited(null)}
                                    />: null}
        
    </PageView>
}