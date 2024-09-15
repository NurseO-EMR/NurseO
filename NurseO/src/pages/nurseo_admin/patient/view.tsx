import { groupBy } from "lodash";
import { useEffect, useState } from "react";
import { ButtonWConfirmBox } from "~/components/Admin/Form/ButtonWConfirmBox";
import { Input } from "~/components/Admin/Form/Input";
import { Td } from "~/components/Admin/Table/Td";
import { Tr } from "~/components/Admin/Table/Tr";
import PageView from "../_PageView";
import { api } from "~/utils/api";
import { useRouter } from "next/navigation";

export default function ViewPatientsPage() {

    const { data: dbPatients, refetch } = api.patient.getPatientList.useQuery()
    const deletePatientMutation = api.patient.deletePatient.useMutation()
    const router = useRouter()
    const [patients, setPatients] = useState(dbPatients)

    useEffect(() => {
        setPatients(dbPatients)
    }, [dbPatients])

    const onDeleteClickHandler = async (patientId: number) => {
        await deletePatientMutation.mutateAsync({ patientId })
        await refetch()
    }

    const onEditClickHandler = (patientId: number) => {
        router.push("/nurseo_admin/patient/edit/" + patientId)
    }

    const onSearchChangeHandler = (searchPhrase: string) => {
        const filtered = dbPatients?.filter(p => p.name.toLowerCase().startsWith(searchPhrase.toLowerCase()))
        setPatients(filtered);
    }


    const getGroupedPatientsJSX = (patients: typeof dbPatients) => {
        if (!patients) return;
        const grouped = groupBy(patients, "courseId")
        const entries = Object.entries(grouped)
        const courses = patients.map(p => { return { id: p.courseId, name: p.courseName } })
        const output = []

        entries.sort()

        for (const e of entries) {
            const courseId = parseInt(e[0]) // this is the course id
            const coursePatients = e[1].sort((a, b) => a.name.localeCompare(b.name))
            const course = courses.find(c => c.id === courseId)
            if (course) output.push(<Tr className="bg-success text-white"><Td colSpan={5}>{course?.name}</Td></Tr>)
            else output.push(<Tr><Td colSpan={5} className="bg-success text-white">No Course Assigned</Td></Tr>)

            for (const p of coursePatients) {
                output.push(
                    <Tr>
                        <Td>{p.name}</Td>
                        <Td>{p.dob}</Td>
                        <Td>{p.barcode}</Td>
                        <td><button className="bg-blue text-white px-4 py-2 mx-auto w-full rounded-none" onClick={() => onEditClickHandler(p.id)}>Edit</button></td>
                        <td><ButtonWConfirmBox
                            className="bg-red text-white px-4 py-2 mx-auto w-full rounded-none"
                            onConfirm={() => onDeleteClickHandler(p.id)}
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
                    {getGroupedPatientsJSX(patients)}
                </tbody>
            </table>
        </div>
    </PageView>
}

