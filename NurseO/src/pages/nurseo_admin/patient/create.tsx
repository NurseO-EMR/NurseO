import PageView from "../_PageView";
import { useState } from "react";
import { createEmptyPatient } from "~/services/Util";
import { cloneDeep, isEqual } from "lodash";
import { Announcement, broadcastAnnouncement } from "~/services/AnnouncementService";
import { PatientProcess } from "~/stages/CreatePatient/PatientProcess";
import type { PatientChart } from "~/core/index";
import { api } from "~/utils/api";


export default function CreatePatientPage() {

    const updateTemplatePatientMutation = api.patient.updatePatient.useMutation()
    const addPatientWMetaDataOnlyMutation = api.patient.addPatientWMetaDataOnly.useMutation()
    const [currentStage, setCurrentStage] = useState(0)
    const [patient, setPatient] = useState(createEmptyPatient());
    const [oldPatient, setOldPatient] = useState(createEmptyPatient());


    const onNextClickHandler = async (newPatient: PatientChart) => {
        const stage = currentStage + 1;
        setCurrentStage(stage);
        // if no patient exist create it
        if (oldPatient.name === "") {
            console.log("creating new patient")
            const id = await addPatientWMetaDataOnlyMutation.mutateAsync({ patient: newPatient })
            oldPatient.dbId = id
            newPatient.dbId = id
            broadcastAnnouncement("patient added", Announcement.success)
        } else if (!isEqual(oldPatient, newPatient)) {
            // once it's created move to updating it
            console.log("updating...")
            newPatient.dbId = oldPatient.dbId
            await updateTemplatePatientMutation.mutateAsync({ oldPatient, newPatient }).catch((e) => broadcastAnnouncement("Error while updating patient " + e, Announcement.error))
            broadcastAnnouncement("patient updated", Announcement.success)
        }

        setPatient(newPatient)
        setOldPatient(cloneDeep(newPatient))

    }
    const onPrevClickHandler = () => {
        let stage = currentStage - 1;
        if (stage < 0) stage = 0;
        setCurrentStage(stage);
    }

    const onAddPatientClickHandler = async () => {
        await onNextClickHandler(patient);
    }

    const stageSkipFn = (stage: number) => {
        if (!(patient.name && patient.id)) broadcastAnnouncement("first two stages are required, please use the next button to processed", Announcement.error)
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