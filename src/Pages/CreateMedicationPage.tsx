import PageView from "./PageView";
import { Steps } from "../Components/Steps/Steps";
import { useState } from "react";
import { Stages } from "../Components/Stages/Stages";
import { MedicationModified as Medication } from "../Services/Core";
import { MedBasicInfoStage } from "../Stages/CreateMed/MedBasicInfoStage";
import { Step } from "../Components/Steps/Step";
import { faPills } from "@fortawesome/free-solid-svg-icons";
import { MedLocationStage } from "../Stages/CreateMed/MedLocationStage";


export default function CreateMedicationPage() {

    const [currentStage, setCurrentStage] = useState(0)

    const EmptyMed: Medication = {
        id: "",
        name: "",
        medBarCode: "",
        narcoticCountNeeded: false,
        station: "",
        building: "",
        drawer: "",
    }


    const [med, setMed] = useState(EmptyMed)


    const onNextClickHandler = () => {
        const stage = currentStage + 1;
        setCurrentStage(stage);
    }
    const onPrevClickHandler = () => {
        let stage = currentStage - 1;
        if (stage < 0) stage = 0;
        setCurrentStage(stage);
    }



    return (
        <PageView>
            <Steps activeStep={currentStage} className="mt-24">
                <Step icon={faPills} />
                <Step icon={faPills} />
            </Steps>

            <Stages stage={currentStage}>
                <MedBasicInfoStage onPrev={onPrevClickHandler} onNext={onNextClickHandler} />
                <MedLocationStage onPrev={onPrevClickHandler}  onNext={onNextClickHandler} />
            </Stages>
        </PageView>
    );
}