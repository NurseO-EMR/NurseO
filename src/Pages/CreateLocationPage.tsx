import PageView from "./PageView";
import { Steps } from "../Components/Steps/Steps";
import { useState } from "react";
import { Stages } from "../Components/Stages/Stages";
import { Step } from "../Components/Steps/Step";
import { faBuilding, faFileInvoice } from "@fortawesome/free-solid-svg-icons";
import { LocationBasicInfoStage } from "../Stages/CreateLocation/LocationBasicInfo";
import { LocationFinalizeStage } from "../Stages/CreateLocation/LocationFinalizeStage";
import { Database } from "../Services/Database";


export default function CreateLocationPage() {

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


    const onBasicInfoHandler = (buildingName: string, stationName: string)=>{
        const db = Database.getInstance();
        setBuildingName(buildingName)
        setStationName(stationName)
        moveStage()
    }



    return (
        <PageView>
            <Steps activeStep={currentStage} className="mt-24">
                <Step icon={faBuilding} />
                <Step icon={faFileInvoice} />
            </Steps>

            <Stages stage={currentStage}>
                <LocationBasicInfoStage onPrev={onPrevClickHandler} onNext={onBasicInfoHandler} />
                <LocationFinalizeStage onPrev={onPrevClickHandler} buildingName={buildingName} stationName={stationName} />
            </Stages>
        </PageView>
    );
}