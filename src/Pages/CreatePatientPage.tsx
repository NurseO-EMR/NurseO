import { faIdCard, faStethoscope, faBookMedical, faHeart, faHeadSideCough,
     faHouseChimneyUser, faSyringe, faMaskVentilator, faComputer, faFileInvoice } from "@fortawesome/free-solid-svg-icons";
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
import { Allergy, CustomOrder, MedicationOrder, MedicalHistory, StudentReport } from "nurse-o-core";
import { ImmunizationsStage } from "../Stages/CreatePatient/ImmunizationsStage";
import { CustomOrdersStage } from "../Stages/CreatePatient/CustomOrdersStage";
import { createEmptyPatient } from "../Services/Util";
import { ChartingStage } from "../Stages/CreatePatient/ChartingStage";
import { ReviewStage } from "../Stages/CreatePatient/ReviewStage";


export default function CreatePatientPage() {

    const [currentStage, setCurrentStage] = useState(0)
    const [dob, setDOB] = useState("")

    
    const [patient, setPatient] = useState(createEmptyPatient());


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
        setPatient(patient);
        onNextClickHandler();
    }

    const onSimInfoHandler = (simInfo: SimSpecificInfo)=>{
        patient.id = simInfo.id
        patient.dob = simInfo.dob
        patient.age = simInfo.age
        patient.time = simInfo.time
        patient.labDocURL = simInfo.labDocURL
        setPatient(patient);

        onNextClickHandler()
    }

    const onAllergiesHandler = (allergies:Allergy[])=>{
        patient.allergies  = allergies;
        setPatient(patient);

        onNextClickHandler();
    }

    const onMedicalHistoryHandler = (medicalHistory:MedicalHistory[])=>{
        patient.medicalHistory = medicalHistory
        setPatient(patient);

        onNextClickHandler();
    }
    
    const onSocialHistoryHandler = (socialHistory:string[])=>{
        patient.socialHistory = socialHistory
        setPatient(patient);

        onNextClickHandler();
    }

    const onMedicalOrdersHandler=(medicalOrders: MedicationOrder[])=>{
        patient.medicationOrders = medicalOrders;
        setPatient(patient);

        onNextClickHandler();
    }

    const onImmunizationsHandler = (immunizations:string[]) =>{
        patient.immunizations = immunizations;
        setPatient(patient);

        onNextClickHandler();
    }

    const onCustomOrdersHandler = (customOrders:CustomOrder[]) =>{
        patient.customOrders = customOrders;
        setPatient(patient);

        onNextClickHandler();
    }

    const onReportSubmitHandler = (reports:StudentReport[])=>{
        patient.studentReports = reports;
        setPatient(patient);

        onNextClickHandler();
    }

    return (
        <PageView>
            <Steps activeStep={currentStage} className="mt-24">
                <Step icon={faIdCard} />
                <Step icon={faHouseChimneyUser} />
                <Step icon={faHeadSideCough} />
                <Step icon={faSyringe} />
                <Step icon={faBookMedical} />
                <Step icon={faHeart} />
                <Step icon={faStethoscope} />
                <Step icon={faMaskVentilator} />
                <Step icon={faComputer} />       
                <Step icon={faFileInvoice} />       
            </Steps>

            <Stages stage={currentStage}>
                <BasicInfoStage onPrev={onPrevClickHandler} onNext={onBasicInfoHandler} />
                <SimSpecificInfoStage onPrev={onPrevClickHandler} onNext={onSimInfoHandler} dob={dob} />
                <AllergiesStage onPrev={onPrevClickHandler} onNext={onAllergiesHandler} />
                <ImmunizationsStage onPrev={onPrevClickHandler} onNext={onImmunizationsHandler} />
                <MedicalHistoryStage onPrev={onPrevClickHandler} onNext={onMedicalHistoryHandler} />
                <SocialHistoryStage onPrev={onPrevClickHandler} onNext={onSocialHistoryHandler} />
                <OrdersStage onPrev={onPrevClickHandler} onNext={onMedicalOrdersHandler} />
                <CustomOrdersStage onPrev={onPrevClickHandler} onNext={onCustomOrdersHandler} />
                <ChartingStage onPrev={onPrevClickHandler} onNext={onReportSubmitHandler} />
                <ReviewStage  onPrev={onPrevClickHandler} onNext={console.log} patient={patient}/>
            </Stages>
        </PageView>
    );
}