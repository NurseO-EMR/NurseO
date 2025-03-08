import { faIdCard, faHouseChimneyUser, faFlag, faHeadSideCough, faSyringe, faBookMedical, faHeart, faPills, faStethoscope, faComputer, faFileInvoice } from "@fortawesome/free-solid-svg-icons";
import { Stages } from "~/components/Admin/Stages/Stages";
import { Step } from "~/components/Admin/Steps/Step";
import { Steps } from "~/components/Admin/Steps/Steps";
import { AllergiesStage } from "./AllergiesStage";
import { type BasicInfo, BasicInfoStage } from "./BasicInfoStage";
import { ChartingStage } from "./ChartingStage";
import { CustomOrdersStage } from "./CustomOrdersStage";
import { FlagsStage } from "./FlagsStage";
import { ImmunizationsStage } from "./ImmunizationsStage";
import { MedicalHistoryStage } from "./MedicalHistoryStage";
import { OrdersStage } from "./OrdersStage";
import { PatientFinalizeStage } from "./PatientFinalizeStage";
import { ReviewStage } from "./ReviewStage";
import { type SimSpecificInfo, SimSpecificInfoStage } from "./SimSpecificInfoStage";
import { SocialHistoryStage } from "./SocialHistoryStage";
import type { Allergy, Flag, MedicalHistory, MedicationOrder, CustomOrder, StudentReport, PatientChart } from "~/core/index";
import { useState } from "react";

type Props = {
    onNext: (patient: PatientChart) => void
    onPrev: () => void
    onFinialStage: () => void
    skipStage: (stage: number) => void
    currentStage: number
    initialPatient: PatientChart

}

export function PatientProcess(props: Props) {


    const [dob, setDOB] = useState("")
    const [patient, setPatient] = useState(props.initialPatient);

    const onNextClickHandler = () => {
        props.onNext(patient)
    }


    const onBasicInfoHandler = (basicInfo: BasicInfo) => {
        patient.name = basicInfo.name
        patient.gender = basicInfo.gender
        patient.height = basicInfo.height
        patient.weight = basicInfo.weight
        patient.diagnosis = basicInfo.diagnosis
        patient.chiefComplaint = basicInfo.chiefComplaint
        patient.code = basicInfo.code
        setDOB(basicInfo.dob)
        setPatient({ ...patient });
        onNextClickHandler();
    }

    const onSimInfoHandler = (simInfo: SimSpecificInfo) => {
        patient.id = simInfo.id
        patient.dob = simInfo.dob
        patient.age = simInfo.age
        patient.time = simInfo.time
        patient.labDocURL = simInfo.labDocURL
        patient.courseId = simInfo.courseId
        patient.imagingURL = simInfo.imagingURL
        setPatient(patient);
        onNextClickHandler()
    }

    const onAllergiesHandler = (allergies: Allergy[]) => {
        patient.allergies = allergies;
        setPatient(patient);
        onNextClickHandler();
    }

    const onFlagsHandler = (flags: Flag[]) => {
        patient.flags = flags;
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




    return <>
        <Steps activeStep={props.currentStage} stageSwitchFn={props.skipStage}>
            <Step icon={faIdCard} />
            <Step icon={faHouseChimneyUser} />
            <Step icon={faFlag} />
            <Step icon={faHeadSideCough} />
            <Step icon={faSyringe} />
            <Step icon={faBookMedical} />
            <Step icon={faHeart} />
            <Step icon={faPills} />
            <Step icon={faStethoscope} />
            <Step icon={faComputer} />
            <Step icon={faFileInvoice} />
        </Steps>

        <Stages stage={props.currentStage}>
            <BasicInfoStage onPrev={props.onPrev} onNext={onBasicInfoHandler} patient={patient} />
            <SimSpecificInfoStage onPrev={props.onPrev} onNext={onSimInfoHandler} dob={dob} patient={patient} />
            <FlagsStage onPrev={props.onPrev} onNext={onFlagsHandler} patient={patient} />
            <AllergiesStage onPrev={props.onPrev} onNext={onAllergiesHandler} patient={patient} />
            <ImmunizationsStage onPrev={props.onPrev} onNext={onImmunizationsHandler} patient={patient} />
            <MedicalHistoryStage onPrev={props.onPrev} onNext={onMedicalHistoryHandler} patient={patient} />
            <SocialHistoryStage onPrev={props.onPrev} onNext={onSocialHistoryHandler} patient={patient} />
            <OrdersStage onPrev={props.onPrev} onNext={onMedicalOrdersHandler} patient={patient} />
            <CustomOrdersStage onPrev={props.onPrev} onNext={onCustomOrdersHandler} patient={patient} />
            <ChartingStage onPrev={props.onPrev} onNext={onReportSubmitHandler} patient={patient} />
            <ReviewStage onPrev={props.onPrev} onNext={props.onFinialStage} patient={patient} customNextText="Update Patient" />
            <PatientFinalizeStage onPrev={console.log} />
        </Stages>

    </>
}