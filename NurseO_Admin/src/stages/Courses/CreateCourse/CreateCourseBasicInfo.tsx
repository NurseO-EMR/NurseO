import { faBook } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { Input } from "~/components/Form/Input";
import { BaseStage, type BaseStageProps } from "~/components/Stages/BaseStage";

export type Props = BaseStageProps & {
    onNext:(courseName: string)=>void
};

export function CreateCourseBasicInfoStage(props:Props) {
    const [courseName, setCourseName] = useState("");
    const [waiting, setWaiting] = useState(false)


    const onNextClickHandler = () => {
        setWaiting(true)
        props.onNext(courseName)
    }



    return <BaseStage {...props} title="Course Info" icon={faBook} onNext={onNextClickHandler} customNextText={waiting ? "Loading..." : "Next"}>
        <Input label="Course Name" onChange={e=>setCourseName(e.currentTarget.value)} value={courseName} />
    </BaseStage>
}