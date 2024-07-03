import { cloneDeep, isEqual } from "lodash";
import { type PatientChart } from "@nurse-o-core/index";
import { useEffect, useState } from "react";
import PageView from "../../_PageView";
import { PatientProcess } from "~/stages/CreatePatient/PatientProcess";
import { useParams } from "next/navigation";
import { api } from "~/utils/api";
import { Announcement, broadcastAnnouncement } from "~/services/AnnouncementService";
import { LoadingCard } from "~/components/loadingCard";



export default function EditPatientPage() {
    const params = useParams()
    const patientId = parseInt(params?.patientId as string)
    const {data: patient, isLoading} = api.patient.getPatientChartById.useQuery({patientId})
    const [oldPatient, setOldPatient] = useState(patient)
    const [newPatient, setNewPatient] = useState(cloneDeep(oldPatient))
    const [currentStage, setCurrentStage] = useState(0)
    const updatePatientMutation = api.patient.updatePatient.useMutation()

    useEffect(()=>{
        if(patient) {setOldPatient(patient)}
    }, [patient])

    useEffect(()=>{
        setNewPatient(cloneDeep(oldPatient))
    }, [oldPatient])

    const onNextClickHandler = async (newPatient:PatientChart) => {
        const stage = currentStage + 1;
        setCurrentStage(stage);
        if (oldPatient && newPatient && !isEqual(oldPatient, newPatient)) {
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
        if(newPatient) await onNextClickHandler(newPatient);
    }


    if(isLoading || !newPatient) return <LoadingCard />

    return <PageView>
        <PatientProcess currentStage={currentStage} initialPatient={newPatient}
            onNext={onNextClickHandler} 
            onPrev={onPrevClickHandler} 
            onFinialStage={onUpdatePatientClickHandler}
            skipStage={setCurrentStage}
        />

    </PageView>

}