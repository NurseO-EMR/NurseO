import { find } from "lodash"
import { Course } from "@nurse-o-core/index"
import { useEffect, useState } from "react"
import PureModal from "react-pure-modal"
import { Announcement, broadcastAnnouncement } from "~/services/AnnouncementService"
import { getCourses } from "~/services/Util"
import { Button } from "../Form/Button"
import { SearchableSelect } from "../Form/SearchableSelect"
import { Td } from "../Table/Td"
import { Tr } from "../Table/Tr"
type Props = {
    courseIds: string[] | undefined,
    onSave: (courseIds: string[])=>void,
    onClose: ()=>void
}
export function CourseEditorModal(props:Props) {
    const [allCourses, setAllCourses] = useState<Course[]>([])
    const [courses, setCourses] = useState<Course[]>([])
    const [saveText, setSaveText] = useState("Save")

    useEffect(()=>{
        getCourses().then(c=>{
            setAllCourses([...c])
            const filtered = c.filter(c=>props.courseIds?.includes(c.id))
            setCourses([...filtered])
        })
    }, [props.courseIds])

    const onDeleteClickHandler = (index:number)=>{
        courses.splice(index, 1)
        setCourses([...courses])
    }

    const onAddClickHandler = (courseId:string) =>{
        const course = find(allCourses, {id:courseId})
        if(course && !courses.includes(course)) {
            courses.push(course)
            setCourses([...courses])
        } else {
            broadcastAnnouncement("Course already added", Announcement.error)
        }
    }


    const onSaveClickHandler = ()=>{
        setSaveText("loading...")
        const ids = courses.map(c=>c.id)
        props.onSave(ids)
    }

    return <PureModal isOpen={true} header="Edit Courses" width="60vw" className="h-1/2" 
    onClose={(e:{isPassive:boolean}) =>e.isPassive ? props.onClose(): null}>
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
                    {courses.map((c,i)=><Tr key={i}>
                        <Td>{c.name}</Td>
                        <td><Button className="bg-red rounded-none" onClick={()=>onDeleteClickHandler(i)}>Delete</Button></td>
                    </Tr>)}


                    {courses.length === 0 ? <Td colSpan={2}>No courses added to this location</Td>: null}
                </tbody>
            </table>


            <SearchableSelect label="Add a course" options={allCourses}
            labelKeys={["name"]} valueKey="id" 
            onChange={onAddClickHandler}  />


            <Button className="bg-blue rounded-none" onClick={onSaveClickHandler}>{saveText}</Button>
        </div>
    </PureModal>
}