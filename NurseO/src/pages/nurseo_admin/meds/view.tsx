import { useState, useEffect } from "react";
import { Card } from "~/components/Admin/Card";
import { Td } from "~/components/Admin/Table/Td";
import { Tr } from "~/components/Admin/Table/Tr";
import PageView from "../_PageView";
import { Input } from "~/components/Admin/Form/Input";
import { ButtonWConfirmBox } from "~/components/Admin/Form/ButtonWConfirmBox";
import { api } from "~/utils/api";
import { Announcement, broadcastAnnouncement } from "~/services/AnnouncementService";
import { useRouter } from "next/navigation";

export default function ViewMedsPage() {
    const { data: meds, isLoading, refetch } = api.admin.getAllMedsWithLocationCount.useQuery()
    const deleteMedMutation = api.admin.deleteMed.useMutation()
    const router = useRouter()

    const [filteredMeds, setFilteredMeds] = useState<{ id: number; brandName: string; genericName: string; narcoticCountNeeded: boolean; numberOfLocations: number; }[]>([]);

    useEffect(() => {
        if (isLoading || !meds) return;
        const medications = meds.sort((a, b) => {
            const first: string = a.genericName ?? a.brandName ?? ""
            const second: string = b.genericName ?? b.brandName ?? ""
            return first.toLowerCase().localeCompare(second.toLowerCase())
        })
        setFilteredMeds([...medications])
    }, [isLoading, meds])


    const onDeleteClickHandler = async (id: number) => {
        const { state, message } = await deleteMedMutation.mutateAsync({ id })
        if (state === "Error") {
            broadcastAnnouncement(message, Announcement.error)
        } else {
            broadcastAnnouncement(message, Announcement.success)
        }
        await refetch()
    }

    const onEditClickHandler = (id: number) => {
        router.push("/nurseo_admin/meds/edit/" + id)
    }

    const onSearchChangeHandler = (searchPhrase: string) => {
        if (isLoading || !meds) return;
        const filtered = meds.filter(m => {
            const phrase = searchPhrase.toLowerCase()
            if (m.brandName && m.brandName.length > 0 && m.brandName.toLowerCase().startsWith(phrase)) return true;
            if (m.genericName && m.genericName.length > 0 && m.genericName.toLowerCase().startsWith(phrase)) return true;
            return false;
        })

        setFilteredMeds(filtered);
    }

    return <PageView>
        <Card className="overflow-auto">
            <h1 className="text-blue text-left font-bold text-lg pb-2">Medications</h1>
            <Input label="Search:" onChange={e => onSearchChangeHandler(e.currentTarget.value)} />
            <table className="w-full">
                <thead>
                    <Tr>
                        <th className="border font-normal">Brand Name</th>
                        <th className="border font-normal">Generic Name</th>
                        <th className="border font-normal">Narcotic Count Needed</th>
                        <th className="border font-normal">Number of locations</th>
                        <th className="border font-normal">Edit</th>
                        <th className="border font-normal">Delete</th>
                    </Tr>
                </thead>
                <tbody>
                    {filteredMeds.map((m, i) =>
                        <Tr key={i}>
                            <Td>{m.brandName ?? ""}</Td>
                            <Td>{m.genericName ?? ""}</Td>
                            <Td>{String(m.narcoticCountNeeded ? "True" : "False")}</Td>
                            <Td>{m.numberOfLocations}</Td>
                            <td><button className="bg-blue text-white px-4 py-2 mx-auto w-full" onClick={() => onEditClickHandler(m.id)}>Edit</button></td>
                            <td><ButtonWConfirmBox className="bg-red text-white px-4 py-2 mx-auto w-full rounded-none "
                                confirmPrompt={`Are you sure you want to delete ${m.genericName}?`}
                                onConfirm={() => onDeleteClickHandler(m.id)}>Delete</ButtonWConfirmBox></td>
                        </Tr>
                    )}
                </tbody>
            </table>
        </Card>
    </PageView>
}