import PageView from "../_PageView";
import { Steps } from "~/components/Admin/Steps/Steps";
import { useState } from "react";
import { Stages } from "~/components/Admin/Stages/Stages";
import type { MedicationLocation, Medication } from "@nurse-o-core/index";
import { MedBasicInfoStage } from "~/stages/CreateMed/MedBasicInfoStage";
import { Step } from "~/components/Admin/Steps/Step";
import { faBuilding, faFileInvoice, faPills } from "@fortawesome/free-solid-svg-icons";
import { MedLocationStage } from "~/stages/CreateMed/MedLocationStage";
import { MedFinalizeStage } from "~/stages/CreateMed/MedFinalizeStage";
import { Announcement, broadcastAnnouncement } from "~/services/AnnouncementService";
import { useRouter } from "next/navigation";
import { api } from "~/utils/api";


export default function CreateMedicationPage() {

    const [currentStage, setCurrentStage] = useState(0)
    const addMedicationMutation = api.medication.addMedication.useMutation()
    const addMedLocationMutation = api.medication.addMedicationLocation.useMutation()

    const emptyMed: Medication = {
        id: -1,
        brandName: "",
        genericName: "",
        narcoticCountNeeded: false,
        locations: []
    }

    const [med, setMed] = useState<Medication>(emptyMed)
    const router = useRouter()


    const moveStage = () => {
        const stage = currentStage + 1;
        setCurrentStage(stage);
    }
    const onPrevClickHandler = () => {
        const stage = currentStage - 1;
        if (stage < 0) router.push("/nurseo_admin")
        setCurrentStage(stage);
    }

    const onMedBasicInfo = async (id: number, brandName: string, genericName: string, narcoticCountNeeded: boolean) => {
        if (!id) {
            broadcastAnnouncement("Can't move to the next stage without entering med info first", Announcement.error)
            return
        }

        med.id = id
        med.brandName = brandName
        med.genericName = genericName
        med.narcoticCountNeeded = narcoticCountNeeded

        // checking if new med
        if (id === -1) {
            const id = await addMedicationMutation.mutateAsync({ medication: med })
            med.id = id
        }

        // see if the -1 stays after adding the med
        if (med.id === -1) {
            broadcastAnnouncement("Error while adding medication", Announcement.error)
        } else {
            setMed(med);
            moveStage()
        }

    }

    const onMedLocationInfo = async (locationId: number, drawerName: string, slotName: string, dose: string, type: string, barcode: string) => {

        const location: MedicationLocation = {
            id: locationId,
            drawer: drawerName,
            slot: slotName,
            dose: dose,
            barcode: barcode,
            type: type
        }

        const results = await addMedLocationMutation.mutateAsync({ medId: med.id, locationId: location.id, locationInfo: location })

        if (results.status === "Error") {
            broadcastAnnouncement(results.message, Announcement.error)
        } else {
            moveStage();
        }
    }



    return (
        <PageView>
            <Steps activeStep={currentStage}>
                <Step icon={faPills} />
                <Step icon={faBuilding} />
                <Step icon={faFileInvoice} />
            </Steps>

            <Stages stage={currentStage}>
                <MedBasicInfoStage onPrev={onPrevClickHandler} onNext={onMedBasicInfo} />
                <MedLocationStage onPrev={onPrevClickHandler} onNext={onMedLocationInfo} />
                <MedFinalizeStage onPrev={onPrevClickHandler} med={med} />
            </Stages>
        </PageView>
    );
}