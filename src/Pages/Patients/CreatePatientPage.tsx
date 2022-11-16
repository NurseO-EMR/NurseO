import { faIdCard, faStethoscope, faBookMedical, faHeart, faHeadSideCough,
     faHouseChimneyUser, faSyringe, faMaskVentilator, faComputer, faFileInvoice } from "@fortawesome/free-solid-svg-icons";
import PageView from "../PageView";
import { Step } from "../../Components/Steps/Step";
import { Steps } from "../../Components/Steps/Steps";
import { useState } from "react";
import { BasicInfo, BasicInfoStage } from "../../Stages/CreatePatient/BasicInfoStage";
import { SimSpecificInfo, SimSpecificInfoStage } from "../../Stages/CreatePatient/SimSpecificInfoStage";
import { Stages } from "../../Components/Stages/Stages";
import { AllergiesStage } from "../../Stages/CreatePatient/AllergiesStage";
import { MedicalHistoryStage } from "../../Stages/CreatePatient/MedicalHistoryStage";
import { SocialHistoryStage } from "../../Stages/CreatePatient/SocialHistoryStage";
import { OrdersStage } from "../../Stages/CreatePatient/OrdersStage";
import { Allergy, CustomOrder, MedicationOrder, MedicalHistory, StudentReport } from "nurse-o-core";
import { ImmunizationsStage } from "../../Stages/CreatePatient/ImmunizationsStage";
import { CustomOrdersStage } from "../../Stages/CreatePatient/CustomOrdersStage";
import { createEmptyPatient } from "../../Services/Util";
import { ChartingStage } from "../../Stages/CreatePatient/ChartingStage";
import { ReviewStage } from "../../Stages/CreatePatient/ReviewStage";
import { Database } from "../../Services/Database";
import { PatientFinalizeStage } from "../../Stages/CreatePatient/PatientFinalizeStage";
import { cloneDeep, isEqual } from "lodash";
import { Announcement, broadcastAnnouncement } from "../../Services/ErrorService";


export default function CreatePatientPage() {

    const [currentStage, setCurrentStage] = useState(0)
    const [dob, setDOB] = useState("")

    
    const [patient, setPatient] = useState(createEmptyPatient());
    const [oldPatient, setOldPatient] = useState(createEmptyPatient());
    const db = Database.getInstance();


    const onNextClickHandler = () => {
        const stage = currentStage + 1;
        setCurrentStage(stage);
        if(!isEqual(oldPatient,patient)) {
            console.log("updated")
            db.updateTemplatePatient(oldPatient,patient) // no await so it moves to the end of the stack
            setOldPatient(cloneDeep(patient))
        }
        
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
        db.addTemplatePatient(patient) // no await so it moves to the end of the stack
        setOldPatient(cloneDeep(patient))
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


    const onAddPatientClickHandler = async ()=>{
        await db.addTemplatePatient(patient)
        console.log("patient Added: ")
        console.log(patient)
        onNextClickHandler();
    }

    const stageSkipFn = (stage:number)=>{
        if(!(patient.name && patient.id)) broadcastAnnouncement("first two stages are required, please use the next button to processed", Announcement.error)
        else setCurrentStage(stage)
    }

    return (
        <PageView>
            <Steps activeStep={currentStage} stageSwitchFn={stageSkipFn}>
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
                <BasicInfoStage onPrev={onPrevClickHandler} onNext={onBasicInfoHandler} patient={patient}/>
                <SimSpecificInfoStage onPrev={onPrevClickHandler} onNext={onSimInfoHandler} dob={dob}  patient={patient}/>
                <AllergiesStage onPrev={onPrevClickHandler} onNext={onAllergiesHandler}  patient={patient}/>
                <ImmunizationsStage onPrev={onPrevClickHandler} onNext={onImmunizationsHandler}  patient={patient}/>
                <MedicalHistoryStage onPrev={onPrevClickHandler} onNext={onMedicalHistoryHandler}  patient={patient}/>
                <SocialHistoryStage onPrev={onPrevClickHandler} onNext={onSocialHistoryHandler}  patient={patient}/>
                <OrdersStage onPrev={onPrevClickHandler} onNext={onMedicalOrdersHandler}  patient={patient}/>
                <CustomOrdersStage onPrev={onPrevClickHandler} onNext={onCustomOrdersHandler}  patient={patient}/>
                <ChartingStage onPrev={onPrevClickHandler} onNext={onReportSubmitHandler}  patient={patient}/>
                <ReviewStage  onPrev={onPrevClickHandler} onNext={onAddPatientClickHandler} patient={patient}/>
                <PatientFinalizeStage onPrev={console.log} />
            </Stages>
        </PageView>
    );
}