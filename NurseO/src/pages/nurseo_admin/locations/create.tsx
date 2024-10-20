import { useState } from "react";
import { faBuilding, faFileInvoice } from "@fortawesome/free-solid-svg-icons";

import PageView from "../_PageView";
import { Steps } from "~/components/Admin/Steps/Steps";

import { Stages } from "~/components/Admin/Stages/Stages";
import { Step } from "~/components/Admin/Steps/Step";
import { LocationBasicInfoStage } from "~/stages/CreateLocation/LocationBasicInfo";
import { LocationFinalizeStage } from "~/stages/CreateLocation/LocationFinalizeStage";
import { api } from "~/utils/api";
import { broadcastAnnouncement, Announcement } from "~/services/AnnouncementService";


export default function CreateLocationPage() {

    const addLocationMutation = api.admin.addLocation.useMutation()
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


    const onBasicInfoHandler = async (building: string, station: string) => {
        setBuildingName(building)
        setStationName(station)
        const { status, message } = await addLocationMutation.mutateAsync({ building, station })
        broadcastAnnouncement(message, status === "Error" ? Announcement.error : Announcement.success)
        if (status === "Success") {
            moveStage()
        }

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