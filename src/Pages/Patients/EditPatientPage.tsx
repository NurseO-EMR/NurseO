import { faIdCard, faHouseChimneyUser, faHeadSideCough, faSyringe, faBookMedical, faHeart, faStethoscope, faComputer, faFileInvoice, faPills } from "@fortawesome/free-solid-svg-icons";
import { clone, cloneDeep, isEqual } from "lodash";
import { Allergy, CustomOrder, MedicalHistory, MedicationOrder, PatientChart, StudentReport } from "nurse-o-core";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Stages } from "../../Components/Stages/Stages";
import { Step } from "../../Components/Steps/Step";
import { Steps } from "../../Components/Steps/Steps";
import { Database } from "../../Services/Database";
import { AllergiesStage } from "../../Stages/CreatePatient/AllergiesStage";
import { BasicInfo, BasicInfoStage } from "../../Stages/CreatePatient/BasicInfoStage";
import { ChartingStage } from "../../Stages/CreatePatient/ChartingStage";
import { CustomOrdersStage } from "../../Stages/CreatePatient/CustomOrdersStage";
import { ImmunizationsStage } from "../../Stages/CreatePatient/ImmunizationsStage";
import { MedicalHistoryStage } from "../../Stages/CreatePatient/MedicalHistoryStage";
import { OrdersStage } from "../../Stages/CreatePatient/OrdersStage";
import { PatientFinalizeStage } from "../../Stages/CreatePatient/PatientFinalizeStage";
import { ReviewStage } from "../../Stages/CreatePatient/ReviewStage";
import { SimSpecificInfo, SimSpecificInfoStage } from "../../Stages/CreatePatient/SimSpecificInfoStage";
import { SocialHistoryStage } from "../../Stages/CreatePatient/SocialHistoryStage";
import PageView from "../PageView";


type RouterState = {
    patient: PatientChart
}

export function EditPatientPage() {
    const state = useLocation().state as RouterState;
    const [oldPatient, setOldPatient] = useState(state.patient)
    const [patient, setPatient] = useState(clone(oldPatient));
    const [currentStage, setCurrentStage] = useState(0)
    const [dob, setDOB] = useState("")
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
        if (stage < 0) stage = 0;
        setCurrentStage(stage);
    }


    const onBasicInfoHandler = (basicInfo: BasicInfo) => {
        patient.name = basicInfo.name
        patient.gender = basicInfo.gender
        patient.height = basicInfo.height
        patient.weight = basicInfo.weight
        patient.diagnosis = basicInfo.diagnosis
        setDOB(basicInfo.dob)
        setPatient(patient);
        onNextClickHandler();
    }

    const onSimInfoHandler = (simInfo: SimSpecificInfo) => {
        patient.id = simInfo.id
        patient.dob = simInfo.dob
        patient.age = simInfo.age
        patient.time = simInfo.time
        patient.labDocURL = simInfo.labDocURL
        setPatient(patient);

        onNextClickHandler()
    }

    const onAllergiesHandler = (allergies: Allergy[]) => {
        patient.allergies = allergies;
        setPatient(patient);

        onNextClickHandler();
    }

    const onMedicalHistoryHandler = (medicalHistory: MedicalHistory[]) => {
        patient.medicalHistory = medicalHistory
        setPatient(patient);

        onNextClickHandler();
    }

    const onSocialHistoryHandler = (socialHistory: string[]) => {
        patient.socialHistory = socialHistory
        setPatient(patient);

        onNextClickHandler();
    }

    const onMedicalOrdersHandler = (medicalOrders: MedicationOrder[]) => {
        patient.medicationOrders = medicalOrders;
        setPatient(patient);

        onNextClickHandler();
    }

    const onImmunizationsHandler = (immunizations: string[]) => {
        patient.immunizations = immunizations;
        setPatient(patient);

        onNextClickHandler();
    }

    const onCustomOrdersHandler = (customOrders: CustomOrder[]) => {
        patient.customOrders = customOrders;
        setPatient(patient);

        onNextClickHandler();
    }

    const onReportSubmitHandler = (reports: StudentReport[]) => {
        patient.studentReports = reports;
        setPatient(patient);
        onNextClickHandler();
    }


    const onUpdatePatientClickHandler = async () => {
        await db.updateTemplatePatient(oldPatient, patient)
        console.log("patient updated: ")
        console.log(patient)
        onNextClickHandler();
    }


    return <PageView>
        <Steps activeStep={currentStage} stageSwitchFn={setCurrentStage}>
            <Step icon={faIdCard} />
            <Step icon={faHouseChimneyUser} />
            <Step icon={faHeadSideCough} />
            <Step icon={faSyringe} />
            <Step icon={faBookMedical} />
            <Step icon={faHeart} />
            <Step icon={faPills} />
            <Step icon={faStethoscope} />
            <Step icon={faComputer} />
            <Step icon={faFileInvoice} />
        </Steps>

        <Stages stage={currentStage}>
            <BasicInfoStage onPrev={onPrevClickHandler} onNext={onBasicInfoHandler} patient={patient} />
            <SimSpecificInfoStage onPrev={onPrevClickHandler} onNext={onSimInfoHandler} dob={dob} patient={patient} />
            <AllergiesStage onPrev={onPrevClickHandler} onNext={onAllergiesHandler} patient={patient} />
            <ImmunizationsStage onPrev={onPrevClickHandler} onNext={onImmunizationsHandler} patient={patient} />
            <MedicalHistoryStage onPrev={onPrevClickHandler} onNext={onMedicalHistoryHandler} patient={patient} />
            <SocialHistoryStage onPrev={onPrevClickHandler} onNext={onSocialHistoryHandler} patient={patient} />
            <OrdersStage onPrev={onPrevClickHandler} onNext={onMedicalOrdersHandler} patient={patient} />
            <CustomOrdersStage onPrev={onPrevClickHandler} onNext={onCustomOrdersHandler} patient={patient} />
            <ChartingStage onPrev={onPrevClickHandler} onNext={onReportSubmitHandler} patient={patient} />
            <ReviewStage onPrev={onPrevClickHandler} onNext={onUpdatePatientClickHandler} patient={patient} customNextText="Update Patient" />
            <PatientFinalizeStage onPrev={console.log} />
        </Stages>
    </PageView>

}