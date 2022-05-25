import { faIdCard, faStethoscope, faBookMedical, faHeart, faHeadSideCough, faBook, faHouseChimneyUser } from "@fortawesome/free-solid-svg-icons";
import PageView from "./PageView";
import { Step } from "../Components/Steps/Step";
import { Steps } from "../Components/Steps/Steps";
import { useState } from "react";
import { BasicInfoStage } from "../Stages/CreatePatient/BasicInfoStage";
import { SimSpecificInfoStage } from "../Stages/CreatePatient/SimSpecificInfoStage";
import { Stages } from "../Components/Stages/Stages";


export default function DashboardPage() {

    const delay = 0.5;


    const [currentStage, setCurrentStage] = useState(0)

    const onNextClickHandler = () => {
        const stage = currentStage + 1;
        setCurrentStage(stage);
    }

    return (
        <PageView>
            <Steps activeStep={currentStage} className="mt-24">
                <Step icon={faIdCard} />
                <Step icon={faHouseChimneyUser} />
                <Step icon={faStethoscope} />
                <Step icon={faBookMedical} />
                <Step icon={faHeart} />
                <Step icon={faHeadSideCough} />
                <Step icon={faBook} />
            </Steps>

            <Stages animationDuration={delay} stage={0}>
                <BasicInfoStage animationDuration={delay} onNextClickHandler={onNextClickHandler} show={currentStage === 0} />
                <SimSpecificInfoStage animationDuration={delay} onNextClickHandler={onNextClickHandler} show={currentStage === 1} />
                
                <BasicInfoStage animationDuration={delay} onNextClickHandler={onNextClickHandler} show={currentStage === 2} />
                <BasicInfoStage animationDuration={delay} onNextClickHandler={onNextClickHandler} show={currentStage === 3} />
                <BasicInfoStage animationDuration={delay} onNextClickHandler={onNextClickHandler} show={currentStage === 4} />
            </Stages>
        </PageView>
    );
}