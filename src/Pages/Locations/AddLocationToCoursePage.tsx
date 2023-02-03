import { useState } from "react";
import { faBuilding, faFileInvoice } from "@fortawesome/free-solid-svg-icons";

import PageView from "../PageView";
import { Steps } from "../../Components/Steps/Steps";

import { Stages } from "../../Components/Stages/Stages";
import { Step } from "../../Components/Steps/Step";
import { Database } from "../../Services/Database";
import { CourseLocationInfoStage } from "../../Stages/Courses/AddCourseToLocation/CourseLocationInfoStage";
import { findIndex } from "lodash";
import { CourseLocationFinalizeStage } from "../../Stages/Courses/AddCourseToLocation/CourseLocationFinalizeStage";


export function AddLocationToCoursePage() {

    const [currentStage, setCurrentStage] = useState(0)
    


    const moveStage = () => {
        const stage = currentStage + 1;
        setCurrentStage(stage);
    }
    const onPrevClickHandler = () => {
        let stage = currentStage - 1;
        if (stage < 0) stage = 0;
        setCurrentStage(stage);
    }


    const onBasicInfoHandler = async (locationId: string, coursesIds: string[])=>{
        const db = Database.getInstance()
        const settings = await db.getSettings()
        const index = findIndex(settings.locations, {id: locationId})
        if(!settings.locations[index].courseIds) settings.locations[index].courseIds = coursesIds
        else settings.locations[index].courseIds.push(...coursesIds)
        await db.updateSettings(settings)
        moveStage()
    }



    return (
        <PageView>
            <Steps activeStep={currentStage}>
                <Step icon={faBuilding} />
                <Step icon={faFileInvoice} />
            </Steps>

            <Stages stage={currentStage}>
                <CourseLocationInfoStage onPrev={onPrevClickHandler} onNext={onBasicInfoHandler} />                
                <CourseLocationFinalizeStage onPrev={onPrevClickHandler} />  
            </Stages>
        </PageView>
    );
}