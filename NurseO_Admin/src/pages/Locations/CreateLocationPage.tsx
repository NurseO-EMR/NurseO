import { useState } from "react";
import {v4 as uuid} from "uuid"
import { faBuilding, faFileInvoice } from "@fortawesome/free-solid-svg-icons";

import PageView from "../PageView";
import { Steps } from "../../Components/Steps/Steps";

import { Stages } from "../../Components/Stages/Stages";
import { Step } from "../../Components/Steps/Step";
import { LocationBasicInfoStage } from "../../Stages/CreateLocation/LocationBasicInfo";
import { LocationFinalizeStage } from "../../Stages/CreateLocation/LocationFinalizeStage";
import { Database } from "../../Services/Database";


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


    const onBasicInfoHandler = async (buildingName: string, stationName: string)=>{
        const db = Database.getInstance();
        const settings =  await db.getSettings();
        setBuildingName(buildingName)
        setStationName(stationName)
        settings.locations.push({
            building: buildingName,
            station: stationName,
            id: uuid(),
            courseIds: []
        })
        await db.updateSettings(settings);
        moveStage()
    }



    return (
        <PageView>
            <Steps activeStep={currentStage}>
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