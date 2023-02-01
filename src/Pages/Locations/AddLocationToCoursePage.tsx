import { useState } from "react";
import {v4 as uuid} from "uuid"
import { faBuilding, faFileInvoice } from "@fortawesome/free-solid-svg-icons";

import PageView from "../PageView";
import { Steps } from "../../Components/Steps/Steps";

import { Stages } from "../../Components/Stages/Stages";
import { Step } from "../../Components/Steps/Step";
import { Database } from "../../Services/Database";
import { CourseLocationInfoStage } from "../../Stages/Courses/AddCourseToLocation/CourseLocationInfoStage";


export function AddLocationToCoursePage() {

    const [currentStage, setCurrentStage] = useState(0)
    const [buildingName, setBuildingName] = useState("");
    const [stationName, setStationName] = useState("");


    const moveStage = () => {
        const stage = currentStage + 1;
        setCurrentStage(stage);
    }
    const onPrevClickHandler = () => {
        let stage = currentStage - 1;
        if (stage < 0) stage = 0;
        setCurrentStage(stage);
    }


    const onBasicInfoHandler = async ()=>{
        
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
                <CourseLocationInfoStage onPrev={onPrevClickHandler} onNext={onBasicInfoHandler} />  
            </Stages>
        </PageView>
    );
}