import PageView from "../PageView";
import { useState } from "react";
import { createEmptyPatient } from "../../Services/Util";
import { Database } from "../../Services/Database";
import { cloneDeep, isEqual } from "lodash";
import { Announcement, broadcastAnnouncement } from "../../Services/AnnouncementService";
import { PatientProcess } from "../../Stages/CreatePatient/PatientProcess";
import { PatientChart } from "nurse-o-core";


export default function CreatePatientPage() {

    const [currentStage, setCurrentStage] = useState(0)

    
    const [patient, setPatient] = useState(createEmptyPatient());
    const [oldPatient, setOldPatient] = useState(createEmptyPatient());
    const db = Database.getInstance();


    const onNextClickHandler = (newPatient:PatientChart) => {
        const stage = currentStage + 1;
        setCurrentStage(stage);
        // if no patient exist create it
        console.log(oldPatient.id)
        console.log(newPatient.id)
        if(oldPatient.name === "") {
            console.log("creating new patient")
            db.addTemplatePatient(patient)  // no await so it moves to the end of the stack
        } else if(!isEqual(oldPatient,newPatient)) {
            // once it's created move to updating it
            console.log("updating...")
            db.updateTemplatePatient(oldPatient,newPatient) // no await so it moves to the end of the stack
        }

        setPatient(newPatient)
        setOldPatient(cloneDeep(newPatient))
        
    }
    const onPrevClickHandler = () => {
        let stage = currentStage - 1;
        if(stage < 0) stage = 0;
        setCurrentStage(stage);
    }

    const onAddPatientClickHandler = async ()=>{
        await db.updateTemplatePatient(oldPatient, patient)
        console.log("patient Added: ")
        console.log(patient)
        onNextClickHandler(patient);
    }

    const stageSkipFn = (stage:number)=>{
        if(!(patient.name && patient.id)) broadcastAnnouncement("first two stages are required, please use the next button to processed", Announcement.error)
        else setCurrentStage(stage)
    }

    return (
        <PageView>
            <PatientProcess 
                currentStage={currentStage}
                initialPatient={patient}
                onNext={onNextClickHandler}
                onPrev={onPrevClickHandler}
                onFinialStage={onAddPatientClickHandler}
                skipStage={stageSkipFn}
            />
        </PageView>
    );
}