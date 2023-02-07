import {v4 as uuid} from "uuid"
import { faBook } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { Input } from "../../../Components/Form/Input";
import { BaseStage, BaseStageProps } from "../../../Components/Stages/BaseStage";

export type Props = BaseStageProps & {
    onNext:(courseId: string, courseName: string)=>void
};

export function CreateCourseBasicInfoStage(props:Props) {
    const [courseId] = useState(uuid())
    const [courseName, setCourseName] = useState("");
    const [waiting, setWaiting] = useState(false)


    const onNextClickHandler = () => {
        setWaiting(true)
        props.onNext(courseId, courseName)
    }



    return <BaseStage {...props} title="Course Info" icon={faBook} onNext={onNextClickHandler} customNextText={waiting ? "Loading..." : "Next"}>
        <Input label="Course ID"  value={courseId} disabled/>
        <Input label="Course Name" onChange={e=>setCourseName(e.currentTarget.value)} value={courseName} />
    </BaseStage>
}