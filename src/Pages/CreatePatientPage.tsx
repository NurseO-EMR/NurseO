import { faIdCard, faStethoscope, faBookMedical, faHeart, faHeadSideCough, faBook, faHouseChimneyUser } from "@fortawesome/free-solid-svg-icons";
import PageView from "./PageView";
import { Step } from "../Components/Steps/Step";
import { Steps } from "../Components/Steps/Steps";
import { useState } from "react";
import { BasicInfoStage } from "../Stages/CreatePatient/BasicInfoStage";
import { SimSpecificInfoStage } from "../Stages/CreatePatient/SimSpecificInfoStage";
import { Stages } from "../Components/Stages/Stages";
import { AllergiesStage } from "../Stages/CreatePatient/AllergiesStage";
import { MedicalHistoryStage } from "../Stages/CreatePatient/MedicalHistoryStage";
import { SocialHistoryStage } from "../Stages/CreatePatient/SocialHistoryStage";
import { OrdersStage } from "../Stages/CreatePatient/OrdersStage";


export default function CreatePatientPage() {

    const [currentStage, setCurrentStage] = useState(5)

    const onNextClickHandler = () => {
        const stage = currentStage + 1;
        setCurrentStage(stage);
    }
    const onPrevClickHandler = () => {
        let stage = currentStage - 1;
        if(stage < 0) stage = 0;
        setCurrentStage(stage);
    }

    return (
        <PageView>
            <Steps activeStep={currentStage} className="mt-24">
                <Step icon={faIdCard} />
                <Step icon={faHouseChimneyUser} />
                <Step icon={faHeadSideCough} />
                <Step icon={faBookMedical} />
                <Step icon={faHeart} />
                <Step icon={faStethoscope} />
                <Step icon={faBook} />
            </Steps>

            <Stages stage={currentStage}>
                <BasicInfoStage onPrev={onPrevClickHandler} onNext={onNextClickHandler} />
                <SimSpecificInfoStage onPrev={onPrevClickHandler} onNext={onNextClickHandler} />
                <AllergiesStage onPrev={onPrevClickHandler} onNext={onNextClickHandler} />
                <MedicalHistoryStage onPrev={onPrevClickHandler} onNext={onNextClickHandler} />
                <SocialHistoryStage onPrev={onPrevClickHandler} onNext={onNextClickHandler} />
                <OrdersStage onPrev={onPrevClickHandler} onNext={onNextClickHandler} />
            </Stages>
        </PageView>
    );
}