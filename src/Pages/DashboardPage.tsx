import { faIdCard, faStethoscope, faBookMedical, faHeart, faHeadSideCough, faBook } from "@fortawesome/free-solid-svg-icons";
import PageView from "./PageView";
import { Step } from "../Components/Steps/Step";
import { Steps } from "../Components/Steps/Steps";
import { useState } from "react";
import { BasicInfoStage } from "../Stages/CreatePatient/BasicInfoStage";

export default function DashboardPage() {

    const delay = 1.5;


    const [stage1, setStage1] = useState(true)
    const [stage2, setStage2] = useState(false)


    const onNextClickHandler = () => {
        if (stage1) {
            setStage1(false)
            setStage2(true)
        }
    }

    return (
        <PageView>
            <Steps activeStep={0} className="mt-24">
                <Step active={stage1} icon={faIdCard} />
                <Step active={stage2} icon={faStethoscope} />
                <Step icon={faBookMedical} />
                <Step icon={faHeart} />
                <Step icon={faHeadSideCough} />
                <Step icon={faBook} />
            </Steps>

            <BasicInfoStage animationDuration={delay} onNextClickHandler={onNextClickHandler} show={stage1} />

        </PageView>
    );
}