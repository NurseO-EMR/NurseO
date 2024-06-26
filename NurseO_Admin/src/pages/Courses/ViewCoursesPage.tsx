import { useState, useEffect } from "react";
import { Card } from "~/components/Card";
import { Td } from "~/components/Table/Td";
import { Tr } from "~/components/Table/Tr";
import { Course } from "@nurse-o-core/index";
import { Database } from "~/services/Database";
import PageView from "../_PageView";
import { findIndex } from "lodash";
import { Input } from "~/components/Form/Input";
import { Button } from "~/components/Form/Button";
import {ButtonWConfirmBox} from "~/components/Form/ButtonWConfirmBox"
import { getCourses } from "~/services/Util";

export function ViewCoursesPage() {
    const [courses, setCourses] = useState<Course[]>([])
    const [saveText, setSaveText] = useState("Save")

    useEffect(() => {
        getCourses().then(c=>setCourses([...c]))
    }, [])


    const onDeleteClickHandler = async (course: Course) => {
        const db = Database.getInstance()
        const settings = await db.getSettings()
        const index = findIndex(settings.courses, {id: course.id})
        settings.courses.splice(index, 1)
        await db.updateSettings(settings)
        const courses = settings.courses
        setCourses([...courses])
    }

    const onCourseEdit = (id:string, name: string) => {
        const index = findIndex(courses, {id})
        courses[index].name = name
        setCourses([...courses])
    }

    const onSaveClickHandler = async () =>{
        setSaveText("Saving...")
        const db = Database.getInstance()
        const settings = await db.getSettings();
        settings.courses = courses
        await db.updateSettings(settings);
        setSaveText("Saved!")
        setTimeout(()=>setSaveText("Save"), 3000)
    }


    return <PageView>
        <Card className="overflow-auto">
            <h1 className="text-blue text-left font-bold text-lg pb-2">Courses:</h1>
            <table className="w-full">
                <thead>
                    <Tr>
                        <th className="border font-normal">Course</th>
                        <th className="border font-normal">ID</th>
                        <th className="border font-normal">Delete</th>
                    </Tr>
                </thead>
                <tbody>
                    {courses.map((c, i) =>
                        <Tr key={i}>
                            <Td><Input label="Course name" hideLabel value={c.name} 
                            onChange={({target})=>onCourseEdit(c.id, target.value)} /></Td>

                            <Td>{String(c.id)}</Td>

                            <td><ButtonWConfirmBox className="bg-red text-white px-4 py-2 mx-auto w-full rounded-none" 
                            confirmPrompt={`Are you sure you want to delete ${c.name}? This will break anything that uses this course`}
                            onConfirm={() => onDeleteClickHandler(c)}>Delete</ButtonWConfirmBox></td>
                        </Tr>
                    )}
                </tbody>
            </table>

            <Button className="bg-blue my-6" onClick={onSaveClickHandler}>{saveText}</Button>
        </Card>
    </PageView>
}