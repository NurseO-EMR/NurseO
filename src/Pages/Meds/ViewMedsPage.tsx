import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "../../Components/Card";
import { Td } from "../../Components/Table/Td";
import { Tr } from "../../Components/Table/Tr";
import { Medication } from "nurse-o-core";
import { Database } from "../../Services/Database";
import PageView from "../PageView";

export function ViewMedsPage() {
    const [meds, setMeds] = useState<Medication[]>([])
    const navigate = useNavigate()


    const getMeds = async () => {
        const db = Database.getInstance()
        const medications = await db.getMedications();
        medications.sort((a,b)=> a.name.toLowerCase().localeCompare(b.name.toLowerCase()))
        setMeds(medications)
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

    return <PageView>
        <Card className="overflow-auto">
            <h1 className="text-blue text-left font-bold text-lg pb-2">Template Patients:</h1>
            <table className="w-full">
                <thead>
                    <Tr>
                        <th className="border font-normal">Med Name</th>
                        <th className="border font-normal">Narcotic Count Needed</th>
                        <th className="border font-normal">Number of locations</th>
                        <th className="border font-normal">Edit</th>
                        <th className="border font-normal">Delete</th>
                    </Tr>
                </thead>
                <tbody>
                    {meds.map((m, i) =>
                        <Tr key={i}>
                            <Td>{m.name}</Td>
                            <Td>{String(m.narcoticCountNeeded)}</Td>
                            <Td>{m.locations?.length}</Td>
                            <td><button className="bg-blue text-white px-4 py-2 mx-auto w-full" onClick={() => onEditClickHandler(m)}>Edit</button></td>
                            <td><button className="bg-red text-white px-4 py-2 mx-auto w-full" onClick={() => onDeleteClickHandler(m)}>Delete</button></td>
                        </Tr>
                    )}
                </tbody>
            </table>
        </Card>
    </PageView>
}