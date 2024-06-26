import { useState } from "react";
import { faBook, faFileInvoice } from "@fortawesome/free-solid-svg-icons";
import PageView from "../_PageView";
import { Steps } from "~/components/Steps/Steps";
import { Stages } from "~/components/Stages/Stages";
import { Step } from "~/components/Steps/Step";
import { Database } from "~/services/Database";
import { CreateCourseBasicInfoStage } from "../../Stages/Courses/CreateCourse/CreateCourseBasicInfo";
import { CourseFinalizeStage } from "../../Stages/Courses/CreateCourse/CourseFinalizeStage";


export default function CreateCoursePage() {

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


    const onBasicInfoHandler = async (courseId: string, courseName: string)=>{
        const db = Database.getInstance();
        const settings =  await db.getSettings();
        setCourseName(courseName)
        if(!settings.courses) settings.courses = []
        settings.courses.push({
            id: courseId,
            name: courseName,
        })
        await db.updateSettings(settings);
        moveStage()
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