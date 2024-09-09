import { faPills } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { isEqual } from "lodash";
import type { Medication } from "@nurse-o-core/index";
import { useEffect, useState } from "react";
import { Card } from "~/components/Admin/Card";
import { Button } from "~/components/Admin/Form/Button";
import { Input } from "~/components/Admin/Form/Input";
import { Select } from "~/components/Admin/Form/Select";
import { Td } from "~/components/Admin/Table/Td";
import { Tr } from "~/components/Admin/Table/Tr";
import PageView from "../../_PageView";
import { useRouter } from "next/router";
import { api } from "~/utils/api";
import { Announcement, broadcastAnnouncement } from "~/services/AnnouncementService";


export default function EditMedPage() {
    const router = useRouter()
    const medId = parseInt(router.query.medId as string)
    const { data, isLoading, refetch } = api.medication.getMedDetails.useQuery({ id: medId })
    const deleteMedLocationMutation = api.medication.deleteMedLocation.useMutation()
    const updateMedicationMutation = api.medication.updateMedication.useMutation()
    const updateMedicationLocationsMutation = api.medication.updateMedicationLocations.useMutation()

    const [brandName, setBrandName] = useState("")
    const [genericName, setGenericName] = useState("")
    const [narcoticCount, setNarcoticCount] = useState(false)
    const [locations, setLocations] = useState([...(data?.locations ?? [])])
    const [saveText, setSaveText] = useState("Save")

    useEffect(() => {
        if (isLoading || !data?.med) return;
        const { brandName, genericName, narcoticCountNeeded } = data.med
        setBrandName(brandName)
        setGenericName(genericName)
        setNarcoticCount(Boolean(narcoticCountNeeded))
    }, [data?.med, isLoading])

    const onLocationChangeHandler = (index: number, key: string, value: string) => {
        if (!locations) return;
        // @ts-expect-error the key and object must be defined and this issue is related to the signature of the index. This code is safe.
        locations[index][key] = value
        setLocations([...locations])
    }


    const onSaveClickHandler = async () => {
        setSaveText("Saving...")
        let somethingHappened = false

        if (!data?.med || !locations) return;
        const old = data.med
        if (!(brandName === old.brandName && genericName === old.genericName && narcoticCount === old.narcoticCountNeeded)) {
            const newMed: Medication = {
                id: data.med.id,
                brandName,
                genericName,
                narcoticCountNeeded: Boolean(narcoticCount),
                locations: []
            }
            const { status, message } = await updateMedicationMutation.mutateAsync({ medication: newMed })
            broadcastAnnouncement(message, status === "Error" ? Announcement.error : Announcement.success)
            somethingHappened = true;
        }


        if (!isEqual(locations, data.locations)) {
            const { status, message } = await updateMedicationLocationsMutation.mutateAsync({ locations })
            console.log(status)
            broadcastAnnouncement(message, status === "Error" ? Announcement.error : Announcement.success)
            somethingHappened = true;
        }

        if (!somethingHappened) broadcastAnnouncement("No Changes Detected", Announcement.info)

        setSaveText("Save")
    }

    const onLocationDeleteHandler = async (index: number) => {
        broadcastAnnouncement("Deleting location...", Announcement.info)
        await deleteMedLocationMutation.mutateAsync({ medLocationId: index })
            .then(() => broadcastAnnouncement("location deleted successfully", Announcement.success))
            .catch(e => broadcastAnnouncement(String(e), Announcement.error))

        await refetch()
    }



    return <PageView>
        <Card className="overflow-scroll">
            <FontAwesomeIcon className="block m-auto text-5xl text-blue" icon={faPills} />
            <h1 className="text-center text-2xl text-blue font-bold mt-4">Edit Medication</h1>
            {/* <Input label="medID" value={props.params.medId} disabled /> */}
            <Input label="Brand Name" onChange={e => setBrandName(e.currentTarget.value)} value={brandName} />
            <Input label="Generic Name" onChange={e => setGenericName(e.currentTarget.value)} value={genericName} />
            <Select label="Does this medication require Narcotic count?" onChange={e => setNarcoticCount(e.currentTarget.value === "true")} value={narcoticCount === true ? "true" : "false"}>
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
                        <th className="border px-6">Concentration</th>
                        <th className="border px-6">Barcode</th>
                        <th className="border px-6">Delete</th>
                    </Tr>
                </thead>
                <tbody>
                    {locations?.map((l, i) => {
                        return <Tr key={i}>
                            <Td>{l.building}</Td>
                            <Td>{l.station}</Td>
                            <Td><Input label="Drawer" hideLabel value={l.drawer} onChange={e => onLocationChangeHandler(i, "drawer", e.currentTarget.value)} /></Td>
                            <Td><Input label="Slot" hideLabel value={l.slot} onChange={e => onLocationChangeHandler(i, "slot", e.currentTarget.value)} /></Td>
                            <Td><Input label="Type" hideLabel value={l.type} onChange={e => onLocationChangeHandler(i, "type", e.currentTarget.value)} /></Td>
                            <Td><Input label="Dose" hideLabel value={l.dose} onChange={e => onLocationChangeHandler(i, "dose", e.currentTarget.value)} /></Td>
                            <Td><Input label="Barcode" hideLabel value={l.barcode} onChange={e => onLocationChangeHandler(i, "barcode", e.currentTarget.value)} /></Td>
                            <td><button className="bg-red text-white px-4 py-2 mx-auto w-full" onClick={() => onLocationDeleteHandler(l.id)}>Delete</button></td>
                        </Tr>
                    })}
                </tbody>
            </table>

            <Button className="bg-blue my-6 rounded-full" onClick={onSaveClickHandler}>{saveText}</Button>
        </Card>

    </PageView>
}

