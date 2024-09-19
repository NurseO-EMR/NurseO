import { useState, useEffect } from "react";
import { Card } from "~/components/Admin/Card";
import { Td } from "~/components/Admin/Table/Td";
import { Tr } from "~/components/Admin/Table/Tr";
import type { LocationDefinition } from "~/core/index";
import PageView from "../_PageView";
import { cloneDeep, findIndex } from "lodash";
import { Input } from "~/components/Admin/Form/Input";
import { Button } from "~/components/Admin/Form/Button";
import { ButtonWConfirmBox } from "~/components/Admin/Form/ButtonWConfirmBox"
import { CourseEditorModal } from "~/components/Admin/Courses/CourseEditorModal";
import { Announcement, broadcastAnnouncement } from "~/services/AnnouncementService";
import { api } from "~/utils/api";

export default function ViewLocationsPage() {
    const { data: dbLocations, refetch } = api.setting.getLocations.useQuery()
    const deleteLocationMutation = api.setting.deleteLocation.useMutation()
    const updateLocationMutation = api.setting.updateLocation.useMutation()
    const [locations, setLocations] = useState<LocationDefinition[]>([])
    const [locationIndexToBeEdited, setLocationIndexToBeEdited] = useState<number | null>(null)


    useEffect(() => {
        if (!dbLocations) return;
        const tempLocations = dbLocations.sort((a, b) => a.building.localeCompare(b.building))
        setLocations(cloneDeep(tempLocations))
    }, [dbLocations])


    const onDeleteClickHandler = async (locationId: number) => {
        const { status, message } = await deleteLocationMutation.mutateAsync({ locationId })
        broadcastAnnouncement(message, status === "Error" ? Announcement.error : Announcement.success)
        await refetch()
    }

    const onBuildingEdit = (id: number, building: string) => {
        const index = findIndex(locations, { id })
        if (index > -1 && !locations[index]) return;
        locations[index]!.building = building // checked above
        setLocations([...locations])
    }

    const onBlurHandler = async (id: number, building: string, station: string) => {
        if (!dbLocations) return;
        const index = dbLocations.findIndex(l => l.id === id)

        // seeing if the location changed, if didn't we don't need to do anything other wise update the db
        if (index === -1 || (dbLocations[index]?.building === building && dbLocations[index]?.station === station)) return;

        const { status, message } = await updateLocationMutation.mutateAsync({ locationId: id, building, station })
        broadcastAnnouncement(message, status === "Error" ? Announcement.error : Announcement.success)
        await refetch()
    }

    const onStationEdit = (id: number, station: string) => {
        const index = findIndex(locations, { id })
        if (index > -1 && !locations[index]) return;
        locations[index]!.station = station  // checked above
        setLocations([...locations])
    }

    return <PageView>
        <Card className="overflow-auto">
            <h1 className="text-blue text-left font-bold text-lg pb-2">Locations:</h1>
            <table className="w-full">
                <thead>
                    <Tr>
                        <th className="border font-normal">Id</th>
                        <th className="border font-normal">Building</th>
                        <th className="border font-normal">Station</th>
                        <th className="border font-normal">Courses</th>
                        <th className="border font-normal">Delete</th>
                    </Tr>
                </thead>
                <tbody>
                    {locations.map((l, i) =>
                        <Tr key={i}>
                            <Td className="text-center">{l.id}</Td>

                            <Td className="w-28"><Input label="building name" hideLabel value={l.building}
                                onChange={({ target }) => onBuildingEdit(l.id, target.value)}
                                onBlur={({ target }) => onBlurHandler(l.id, target.value, l.station)}
                            /></Td>

                            <Td><Input label="station name" hideLabel value={l.station}
                                onChange={({ target }) => onStationEdit(l.id, target.value)}
                                onBlur={({ target }) => onBlurHandler(l.id, l.building, target.value)}
                            /></Td>

                            <td className="min-w-[9rem]"><Button className="bg-blue text-white px-4 py-2 rounded-none" onClick={() => setLocationIndexToBeEdited(i)}>Edit Courses</Button></td>
                            <td><ButtonWConfirmBox className="bg-red text-white px-4 py-2 mx-auto w-full rounded-none"
                                confirmPrompt={`Are you sure you want to delete ${l.building}-${l.station}? This will break any medication in that location`}
                                onConfirm={() => onDeleteClickHandler(l.id)}>Delete</ButtonWConfirmBox></td>
                        </Tr>
                    )}
                </tbody>
            </table>

        </Card>
        {locationIndexToBeEdited !== null ? <CourseEditorModal
            locationId={locations[locationIndexToBeEdited]!.id}
            onClose={() => setLocationIndexToBeEdited(null)}
        /> : null}

    </PageView>
}