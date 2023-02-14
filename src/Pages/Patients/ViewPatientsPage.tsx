import { find, groupBy } from "lodash";
import { Course, PatientChart } from "nurse-o-core";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ButtonWConfirmBox } from "../../Components/Form/ButtonWConfirmBox";
import { Input } from "../../Components/Form/Input";
import { Td } from "../../Components/Table/Td";
import { Tr } from "../../Components/Table/Tr";
import { Database } from "../../Services/Database";
import PageView from "../PageView";

export function ViewPatientsPage() {
    const db = Database.getInstance()
    const [patients, setPatients] = useState<PatientChart[]>([])
    const navigate = useNavigate()
    const [filteredPatients, setFilteredPatients] = useState<PatientChart[]>([])
    const [courses, setCourses] = useState<Course[]>([])


    const getPatients = async () => {
        const patients = await db.getTemplatePatients();
        const { courses } = await db.getSettings()
        patients.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()))
        setCourses([...courses])
        setPatients([...patients])
        setFilteredPatients([...patients])
    }

    useEffect(() => {
        getPatients()
    }, [])


    const onDeleteClickHandler = async (patient: PatientChart) => {
        const db = Database.getInstance()
        await db.deleteTemplatePatient(patient)
        await getPatients();
    }

    const onEditClickHandler = async (patient: PatientChart) => {
        navigate("/patient/edit", { state: { patient } })
    }

    const onSearchChangeHandler = (searchPhrase: string) => {
        const filtered = patients.filter(p => p.name.toLowerCase().startsWith(searchPhrase.toLowerCase()))
        setFilteredPatients(filtered);
    }


    const getGroupedPatientsJSX = (patients: PatientChart[]) => {

        const grouped = groupBy(patients, "courseId")
        const entries = Object.entries(grouped) as unknown as [string, PatientChart[]][]
        const output = []

        entries.sort()

        for (const e of entries) {
            const courseId = e[0]
            const coursePatients = e[1].sort((a,b)=>a.id.localeCompare(b.id))
            const course = find(courses, { id: courseId })
            if (course) output.push(<Tr className="bg-success text-white"><Td colSpan={5}>{course?.name}</Td></Tr>)
            else output.push(<Tr><Td colSpan={5} className="bg-success text-white">No Course Assigned</Td></Tr>)

            for (const p of coursePatients) {
                output.push(
                    <Tr>
                        <Td>{p.name}</Td>
                        <Td>{p.dob}</Td>
                        <Td>{p.id}</Td>
                        <td><button className="bg-blue text-white px-4 py-2 mx-auto w-full" onClick={() => onEditClickHandler(p)}>Edit</button></td>
                        <td><ButtonWConfirmBox
                             className="bg-red text-white px-4 py-2 mx-auto w-full rounded-none"
                            onConfirm={() => onDeleteClickHandler(p)} 
                            confirmPrompt={"Are you sure you want to delete this patient?"}>Delete</ButtonWConfirmBox>
                        </td>
                    </Tr>
                )
            }
        }

        return output
    }

    return <PageView>
        <div className="bg-gray shadow-xl mx-auto rounded-lg mt-[12vh] h-[80vh] w-[60vw] py-5 px-4 overflow-y-auto">
            <h1 className="text-blue text-left font-bold text-lg pb-2">Template Patients:</h1>
            <Input label="Search:" onChange={e => onSearchChangeHandler(e.currentTarget.value)} />
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
                    {getGroupedPatientsJSX(filteredPatients)}
                </tbody>
            </table>
        </div>
    </PageView>
}

