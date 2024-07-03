import { useState } from "react";
import { faBook, faFileInvoice } from "@fortawesome/free-solid-svg-icons";
import PageView from "../_PageView";
import { Steps } from "~/components/Steps/Steps";
import { Stages } from "~/components/Stages/Stages";
import { Step } from "~/components/Steps/Step";
import { CreateCourseBasicInfoStage } from "~/stages/Courses/CreateCourse/CreateCourseBasicInfo";
import { CourseFinalizeStage } from "~/stages/Courses/CreateCourse/CourseFinalizeStage";
import { api } from "~/utils/api";
import { broadcastAnnouncement, Announcement } from "~/services/AnnouncementService";


export default function CreateCoursePage() {

    const addCourseMutation = api.setting.addCourse.useMutation()
    const [currentStage, setCurrentStage] = useState(0)
    const [courseName, setCourseName] = useState("");


    const moveStage = () => {
        const stage = currentStage + 1;
        setCurrentStage(stage);
    }
    const onPrevClickHandler = () => {
        let stage = currentStage - 1;
        if (stage < 0) stage = 0;
        setCurrentStage(stage);
    }


    const onBasicInfoHandler = async (courseName: string)=>{
        const {status, message} = await addCourseMutation.mutateAsync({courseName})
        broadcastAnnouncement(message, status === "Error" ? Announcement.error : Announcement.success)
        if(status === "Success") {
            setCourseName(courseName)
            moveStage()
        }
    }



    return (
        <PageView>
            <Steps activeStep={currentStage}>
                <Step icon={faBook} />
                <Step icon={faFileInvoice} />
            </Steps>

            <Stages stage={currentStage}>
                <CreateCourseBasicInfoStage onPrev={onPrevClickHandler} onNext={onBasicInfoHandler} />
                <CourseFinalizeStage onPrev={onPrevClickHandler} courseName={courseName} />
            </Stages>
        </PageView>
    );
}