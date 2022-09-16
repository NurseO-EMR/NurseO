import { PatientChart } from "nurse-o-core";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ButtonWConfirmBox } from "../../Components/Form/ButtonWConfirmBox";
import { Td } from "../../Components/Table/Td";
import { Tr } from "../../Components/Table/Tr";
import { Database } from "../../Services/Database";
import PageView from "../PageView";

export function ViewPatientsPage() {

    const [patients, setPatients] = useState<PatientChart[]>([])
    const navigate = useNavigate()


    const getPatients = async () => {
        const db = Database.getInstance()
        const patients = await db.getTemplatePatients();
        patients.sort((a,b)=> a.name.toLowerCase().localeCompare(b.name.toLowerCase()))
        setPatients(patients)
    }

    useEffect(() => {
        getPatients()
    }, [])


    const onDeleteClickHandler = async (patient: PatientChart) => {
        const db = Database.getInstance()
        await db.deleteTemplatePatient(patient)
        await getPatients();
    }

    const onEditClickHandler = async (patient:PatientChart) => {
        navigate("/patient/edit",{state:{patient}})
    }

    return <PageView>
        <div className="bg-gray shadow-xl mx-auto rounded-lg mt-[20vh] h-[60vh] w-[40vw] py-5 px-4 overflow-y-auto">
            <h1 className="text-blue text-left font-bold text-lg pb-2">Template Patients:</h1>
            <table className="w-full">
                <thead>
                    <Tr>
                        <th className="border font-normal">Patient Name</th>
                        <th className="border font-normal">Patient DOB</th>
                        <th className="border font-normal">Patient Barcode</th>
                        <th className="border font-normal">Edit</th>
                        <th className="border font-normal">Delete</th>
                    </Tr>
                </thead>
                <tbody>
                    {patients.map((p, i) =>
                        <Tr key={i}>
                            <Td>{p.name}</Td>
                            <Td>{p.dob}</Td>
                            <Td>{p.id}</Td>
                            <td><button className="bg-blue text-white px-4 py-2 mx-auto w-full" onClick={()=>onEditClickHandler(p)}>Edit</button></td>
                            <td><ButtonWConfirmBox className="bg-red text-white px-4 py-2 mx-auto w-full rounded-none"
                            onConfirm={() => onDeleteClickHandler(p)} confirmPrompt={"Are you sure you want to delete this patient?"}>Delete</ButtonWConfirmBox></td>
                        </Tr>
                    )}
                </tbody>
            </table>
        </div>
    </PageView>
}

