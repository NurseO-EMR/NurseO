import { clone, cloneDeep, isEqual } from "lodash";
import { type PatientChart } from "@nurse-o-core/index";
import { useMemo, useState } from "react";
import PageView from "../../_PageView";
import { PatientProcess } from "~/Stages/CreatePatient/PatientProcess";
import { useParams } from "next/navigation";
import { api } from "~/utils/api";
import { Announcement, broadcastAnnouncement } from "~/services/AnnouncementService";
import { createEmptyPatient } from "~/services/Util";



export default function EditPatientPage() {
    const params = useParams()
    const patientId = parseInt(params?.patientId as string)
    const {data: patient} = api.patient.getPatientChartById.useQuery({patientId})
    const [oldPatient, setOldPatient] = useState(patient ?? createEmptyPatient())
    const newPatient = useMemo(()=>cloneDeep(oldPatient), [oldPatient])
    const [currentStage, setCurrentStage] = useState(0)
    const updatePatientMutation = api.patient.updatePatient.useMutation()


    const onNextClickHandler = async (newPatient:PatientChart) => {
        const stage = currentStage + 1;
        setCurrentStage(stage);
        if (!isEqual(oldPatient, newPatient)) {
            console.log("updating...")
            await updatePatientMutation.mutateAsync({oldPatient, newPatient}).catch((e)=>broadcastAnnouncement("Error while updating: " +  e, Announcement.error))
            setOldPatient(cloneDeep(newPatient))
            broadcastAnnouncement("Patient Updated", Announcement.success)
        } else { console.log("no update") }
    }

    const onPrevClickHandler = () => {
        let stage = currentStage - 1;
        if (stage < 0) stage = 0;
        setCurrentStage(stage);
    }


    const onUpdatePatientClickHandler = async () => {
        // await db.updateTemplatePatient(oldPatient, patient)
        // console.log("patient updated: ")
        // console.log(patient)
        // onNextClickHandler(patient);
    }

    if(!patient) return (
        <h1>Patient Not Found</h1>
    )


    return <PageView>
        <PatientProcess currentStage={currentStage} initialPatient={newPatient}
            onNext={onNextClickHandler} 
            onPrev={onPrevClickHandler} 
            onFinialStage={onUpdatePatientClickHandler}
            skipStage={setCurrentStage}
        />

    </PageView>

}