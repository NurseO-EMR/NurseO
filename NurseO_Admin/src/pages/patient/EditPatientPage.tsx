import { clone, cloneDeep, isEqual } from "lodash";
import { PatientChart } from "nurse-o-core";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Database } from "../../Services/Database";
import PageView from "../_PageView";
import { PatientProcess } from "../../Stages/CreatePatient/PatientProcess";


type RouterState = {
    patient: PatientChart
}

export function EditPatientPage() {
    const state = useLocation().state as RouterState;
    const [oldPatient, setOldPatient] = useState(state.patient)
    const [patient, setPatient] = useState(clone(oldPatient));
    const [currentStage, setCurrentStage] = useState(0)
    const db = Database.getInstance();


    const onNextClickHandler = (newPatient:PatientChart) => {
        const stage = currentStage + 1;
        setCurrentStage(stage);
        if (!isEqual(oldPatient, newPatient)) {
            console.log("updating...")
            db.updateTemplatePatient(oldPatient, newPatient) // no await so it moves to the end of the stack
            setPatient(newPatient)
            setOldPatient(cloneDeep(newPatient))
        } else { console.log("no update") }
    }

    const onPrevClickHandler = () => {
        let stage = currentStage - 1;
        if (stage < 0) stage = 0;
        setCurrentStage(stage);
    }


    const onUpdatePatientClickHandler = async () => {
        await db.updateTemplatePatient(oldPatient, patient)
        console.log("patient updated: ")
        console.log(patient)
        onNextClickHandler(patient);
    }



    return <PageView>
        <PatientProcess currentStage={currentStage} initialPatient={patient}
            onNext={onNextClickHandler} 
            onPrev={onPrevClickHandler} 
            onFinialStage={onUpdatePatientClickHandler}
            skipStage={setCurrentStage}
        />

    </PageView>

}