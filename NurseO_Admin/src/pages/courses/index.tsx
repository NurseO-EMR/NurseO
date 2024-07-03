import { useState, useEffect } from "react";
import { Card } from "~/components/Card";
import { Td } from "~/components/Table/Td";
import { Tr } from "~/components/Table/Tr";
import type { Course } from "@nurse-o-core/index";
import PageView from "../_PageView";
import { cloneDeep } from "lodash";
import { Input } from "~/components/Form/Input";
import {ButtonWConfirmBox} from "~/components/Form/ButtonWConfirmBox"
import { api } from "~/utils/api";
import { broadcastAnnouncement, Announcement } from "~/services/AnnouncementService";

export default function ViewCoursesPage() {
    const {data: dbCourses, refetch} = api.setting.getCourses.useQuery()
    const deleteCourseMutation = api.setting.deleteCourse.useMutation()
    const updateCourseMutation = api.setting.updateCourse.useMutation()

    const [courses, setCourses] = useState<Course[]>([])

    useEffect(()=>{
        if(!dbCourses) return
        setCourses(cloneDeep(dbCourses))
    }, [dbCourses])

    const onDeleteClickHandler = async (courseId: number) => {
        const {status, message} = await deleteCourseMutation.mutateAsync({courseId})
        broadcastAnnouncement(message, status === "Error" ? Announcement.error : Announcement.success)
        await refetch()
    }

    const onCourseEdit = (id:number, name: string) => {
        const index = courses.findIndex(c=>c.id === id)
        courses[index]!.name = name // the index has to exist 
        setCourses([...courses])
    }

    const onBlurHandler = async (id: number, name: string) => {
        const {status, message} = await updateCourseMutation.mutateAsync({courseId: id, courseName: name})
        broadcastAnnouncement(message, status === "Error" ? Announcement.error : Announcement.success)
    }




    return <PageView>
        <Card className="overflow-auto">
            <h1 className="text-blue text-left font-bold text-lg pb-2">Courses:</h1>
            <table className="w-full">
                <thead>
                    <Tr>
                        <th className="border font-normal">Course</th>
                        <th className="border font-normal">Delete</th>
                    </Tr>
                </thead>
                <tbody>
                    {courses.map((c, i) =>
                        <Tr key={i}>
                            <Td><Input label="Course name" hideLabel value={c.name} 
                            onChange={({target})=>onCourseEdit(c.id, target.value)}
                            onBlur={({target})=>onBlurHandler(c.id, target.value)}
                            /></Td>

                            <td><ButtonWConfirmBox className="bg-red text-white px-4 py-2 mx-auto w-full rounded-none" 
                            confirmPrompt={`Are you sure you want to delete ${c.name}? This will break anything that uses this course`}
                            onConfirm={() => onDeleteClickHandler(c.id)}>Delete</ButtonWConfirmBox></td>
                        </Tr>
                    )}
                </tbody>
            </table>

        </Card>
    </PageView>
}