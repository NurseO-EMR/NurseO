import { useState } from "react";
import { faBuilding, faFileInvoice } from "@fortawesome/free-solid-svg-icons";

import PageView from "../_PageView";
import { Steps } from "~/components/Steps/Steps";

import { Stages } from "~/components/Stages/Stages";
import { Step } from "~/components/Steps/Step";
import { Database } from "~/services/Database";
import { AdminEmailStage } from "../../Stages/CreateAdmin/AdminEmailStage";
import { AdminStageFinalized } from "../../Stages/CreateAdmin/AdminStageFinalized";


export default function CreateAdminPage() {

    const [currentStage, setCurrentStage] = useState(0)
    const [adminEmail, setAdminEmail] = useState("") 


    const moveStage = () => {
        const stage = currentStage + 1;
        setCurrentStage(stage);
    }
    const onPrevClickHandler = () => {
        let stage = currentStage - 1;
        if (stage < 0) stage = 0;
        setCurrentStage(stage);
    }


    const onBasicInfoHandler = async (email: string)=>{
        const db = Database.getInstance();
        const admins = await db.getAdminList();
        admins.push(email)
        await db.updateAdminList(admins)
        setAdminEmail(email)
        moveStage()
    }



    return (
        <PageView>
            <Steps activeStep={currentStage}>
                <Step icon={faBuilding} />
                <Step icon={faFileInvoice} />
            </Steps>

            <Stages stage={currentStage}>
                <AdminEmailStage onPrev={onPrevClickHandler} onNext={onBasicInfoHandler} />
                <AdminStageFinalized onPrev={onPrevClickHandler} adminEmailAddress={adminEmail} />
            </Stages>
        </PageView>
    );
}