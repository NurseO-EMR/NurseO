import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "~/components/Card";
import { Td } from "~/components/Table/Td";
import { Tr } from "~/components/Table/Tr";
import { Medication } from "@nurse-o-core/index";
import { Database } from "~/services/Database";
import PageView from "../_PageView";
import { Input } from "~/components/Form/Input";
import { ButtonWConfirmBox } from "~/components/Form/ButtonWConfirmBox";

export function ViewMedsPage() {
    const [meds, setMeds] = useState<Medication[]>([])
    const navigate = useNavigate()
    const [filteredMeds, setFilteredMeds] = useState<Medication[]>([]);


    const getMeds = async () => {
        const db = Database.getInstance()
        const medications = await db.getMedications();
        medications.sort((a, b) => {
            const first:string = a.genericName || a.brandName || ""
            const second:string = b.genericName || b.brandName || ""
            return first.toLowerCase().localeCompare(second.toLowerCase())   
        })
        setMeds(medications)
        setFilteredMeds(medications)
    }

    useEffect(() => {
        getMeds()
    }, [])


    const onDeleteClickHandler = async (med: Medication) => {
        const db = Database.getInstance()
        await db.deleteMedication(med)
        await getMeds();
    }

    const onEditClickHandler = async (med: Medication) => {
        navigate("/meds/edit", { state: { med } })
    }

    const onSearchChangeHandler = (searchPhrase: string) => {
        const filtered: Medication[] = meds.filter(m => {
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
                            <Td>{m.brandName || ""}</Td>
                            <Td>{m.genericName || ""}</Td>
                            <Td>{String(m.narcoticCountNeeded)}</Td>
                            <Td>{m.locations?.length}</Td>
                            <td><button className="bg-blue text-white px-4 py-2 mx-auto w-full" onClick={() => onEditClickHandler(m)}>Edit</button></td>
                            <td><ButtonWConfirmBox className="bg-red text-white px-4 py-2 mx-auto w-full rounded-none " 
                            confirmPrompt={`Are you sure you want to delete ${m.genericName}? This will break any patient that uses this medication`}
                            onConfirm={() => onDeleteClickHandler(m)}>Delete</ButtonWConfirmBox></td>
                        </Tr>
                    )}
                </tbody>
            </table>
        </Card>
    </PageView>
}