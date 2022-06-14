import { faIdCard, faStethoscope, faBookMedical, faHeart, faHeadSideCough, faBook, faHouseChimneyUser } from "@fortawesome/free-solid-svg-icons";
import PageView from "./PageView";
import { Step } from "../Components/Steps/Step";
import { Steps } from "../Components/Steps/Steps";
import { useState } from "react";
import { BasicInfo, BasicInfoStage } from "../Stages/CreatePatient/BasicInfoStage";
import { SimSpecificInfo, SimSpecificInfoStage } from "../Stages/CreatePatient/SimSpecificInfoStage";
import { Stages } from "../Components/Stages/Stages";
import { AllergiesStage } from "../Stages/CreatePatient/AllergiesStage";
import { MedicalHistoryStage } from "../Stages/CreatePatient/MedicalHistoryStage";
import { SocialHistoryStage } from "../Stages/CreatePatient/SocialHistoryStage";
import { OrdersStage } from "../Stages/CreatePatient/OrdersStage";
import { Allergy, MedicationOrder, PatientChart } from "nurse-o-core";
import { MedicalHistory } from "../Services/Core";


export default function CreatePatientPage() {

    const patient:PatientChart = {
        id: "", //done
        name: "", //done
        age: "", //done
        dob: "",  //done
        gender: "other",  //done
        height: "",  //done
        labDocURL: "", //done
        studentUID: "", //done
        weight: "",  //done
        medicalIssues: [],
        medicationOrders: [], //done
        notes: [],
        studentReports: [],
        time: {hour: 0, minutes: 0}, //done
        immunizations: [],
        customOrders: [],
        flags: [],
        allergies: [] //done
    }

    const [currentStage, setCurrentStage] = useState(1)
    const [dob, setDOB] = useState("")

    const onNextClickHandler = () => {
        const stage = currentStage + 1;
        setCurrentStage(stage);
    }
    const onPrevClickHandler = () => {
        let stage = currentStage - 1;
        if(stage < 0) stage = 0;
        setCurrentStage(stage);
    }


    const onBasicInfoHandler = (basicInfo: BasicInfo) =>{
        patient.name = basicInfo.name
        patient.gender = basicInfo.gender
        patient.height = basicInfo.height
        patient.weight = basicInfo.weight
        setDOB(basicInfo.dob)
        onNextClickHandler();
    }

    const onSimInfoHandler = (simInfo: SimSpecificInfo)=>{
        patient.id = simInfo.id
        patient.dob = simInfo.dob
        patient.age = simInfo.age
        patient.time = simInfo.time
        patient.labDocURL = simInfo.labDocURL
        onNextClickHandler()
    }

    const onAllergiesHandler = (allergies:Allergy[])=>{
        patient.allergies  = allergies;
        onNextClickHandler();
    }

    const onMedicalHistoryHandler = (medicalHistory:MedicalHistory[])=>{
        // patient.medicalIssues  = medicalHistory;
        onNextClickHandler();
    }


    
    const onSocialHistoryHandler = (socialHistory:string[])=>{
        // patient.allergies  = allergies;
        onNextClickHandler();
    }

    const onMedicalOrdersHandler=(medicalOrders: MedicationOrder[])=>{
        patient.medicationOrders = medicalOrders;
    }

    return (
        <PageView>
            <Steps activeStep={currentStage} className="mt-24">
                <Step icon={faIdCard} />
                <Step icon={faHouseChimneyUser} />
                <Step icon={faHeadSideCough} />
                <Step icon={faBookMedical} />
                <Step icon={faHeart} />
                <Step icon={faStethoscope} />
                <Step icon={faBook} />
            </Steps>

            <Stages stage={currentStage}>
                <BasicInfoStage onPrev={onPrevClickHandler} onNext={onBasicInfoHandler} />
                <SimSpecificInfoStage onPrev={onPrevClickHandler} onNext={onSimInfoHandler} dob={dob} />
                <AllergiesStage onPrev={onPrevClickHandler} onNext={onAllergiesHandler} />
                <MedicalHistoryStage onPrev={onPrevClickHandler} onNext={onMedicalHistoryHandler} />
                <SocialHistoryStage onPrev={onPrevClickHandler} onNext={onSocialHistoryHandler} />
                <OrdersStage onPrev={onPrevClickHandler} onNext={onMedicalOrdersHandler} />
            </Stages>
        </PageView>
    );
}