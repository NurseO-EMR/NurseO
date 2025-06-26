import type { Course } from "~/core/index"
import { useMemo } from "react"
import { Announcement, broadcastAnnouncement } from "~/services/AnnouncementService"
import { Button } from "../Form/Button"
import { SearchableSelect } from "../Form/SearchableSelect"
import { Td } from "../Table/Td"
import { Tr } from "../Table/Tr"
import { api } from "~/utils/api"
import { Dialog, DialogContent, DialogTitle } from "~/components/common/ui/dialog"
type Props = {
    locationId: number
    onClose: () => void
}
export function CourseEditorModal(props: Props) {
    const { data: allCourses } = api.admin.getCourses.useQuery()
    const { data: courses, refetch } = api.admin.getCoursesInSpecificLocation.useQuery({ locationId: props.locationId })
    const deleteCourseFromLocationMutation = api.admin.deleteCourseFromLocation.useMutation()
    const addCourseToLocationMutation = api.admin.addCourseToLocation.useMutation()
    const coursesToBeAdded = useMemo(() => getCoursesDiff(allCourses ?? [], courses ?? []), [allCourses, courses])


    const onDeleteClickHandler = async (courseId: number) => {
        const { status, message } = await deleteCourseFromLocationMutation.mutateAsync({ courseId, locationId: props.locationId })
        await refetch()
        broadcastAnnouncement(message, status === "Error" ? Announcement.error : Announcement.success)
    }

    const onAddClickHandler = async (courseId: number) => {
        const { status, message } = await addCourseToLocationMutation.mutateAsync({ courseId, locationId: props.locationId })
        await refetch()
        broadcastAnnouncement(message, status === "Error" ? Announcement.error : Announcement.success)
    }

    return <Dialog open={true} onOpenChange={e => e === false && props.onClose()}>
        <DialogTitle>Edit Courses</DialogTitle>
        <DialogContent className="min-h-[50%] min-w-[60vw]">
            <div>
                <h1 className="font-bold my-2">Courses Available at this location: </h1>
                <table className="w-full">
                    <thead>
                        <Tr>
                            <th className="border">Course Name</th>
                            <th className="border">Delete</th>
                        </Tr>
                    </thead>
                    <tbody>
                        {courses?.map((c, i) => <Tr key={i}>
                            <Td>{c.name}</Td>
                            <td><Button className="bg-red rounded-none" onClick={() => onDeleteClickHandler(c.id)}>Delete</Button></td>
                        </Tr>)}


                        {courses?.length === 0 ? <Td colSpan={2}>No courses added to this location</Td> : null}
                    </tbody>
                </table>


                <SearchableSelect label="Add a course" options={coursesToBeAdded}
                    labelKeys={["name"]} valueKey="id"
                    onChange={(v) => onAddClickHandler(parseInt(v))} />

            </div>
        </DialogContent>
    </Dialog>
}


function getCoursesDiff(fullList: Course[], partialList: Course[]) {
    const diff = []
    for (const course of fullList) {
        const index = partialList.findIndex(p => p.id === course.id)
        if (index > -1) continue;
        else diff.push(course)
    }
    return diff;
}