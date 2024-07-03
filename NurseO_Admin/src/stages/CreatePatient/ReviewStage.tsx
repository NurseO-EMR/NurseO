import { faFileInvoice } from "@fortawesome/free-solid-svg-icons";
import type { PatientChart } from "@nurse-o-core/index";
import { useState } from "react";
import { BaseStage, type BaseStageProps } from "~/components/Stages/BaseStage";
import { ReviewItem } from "~/components/Stages/Review/ReviewItem";
import { ReviewSection } from "~/components/Stages/Review/ReviewSection";
import { Td } from "~/components/Table/Td";
import { Tr } from "~/components/Table/Tr";

export type Props = BaseStageProps & {
    onNext: () => void,
    patient: PatientChart
    customNextText?: string
};


export function ReviewStage(props: Props) {

    const [loading, setLoading] = useState(false)


    const onNextClickHandler = () => {
        setLoading(true)
        props.onNext()
    }

    return <BaseStage {...props} title="Review" icon={faFileInvoice} onNext={onNextClickHandler} customNextText={loading ? "Loading..." : props.customNextText ?? "Add Patient"}>
        <ReviewSection title="Basic Info">
            <ReviewItem label="Name" value={props.patient.name} />
            <ReviewItem label="DOB" value={props.patient.dob} />
            <ReviewItem label="Gender" value={props.patient.gender} />
            <ReviewItem label="Height" value={props.patient.height} />
            <ReviewItem label="Weight" value={props.patient.weight} />
        </ReviewSection>
        <ReviewSection title="Sim Info">
            <ReviewItem label="Barcode" value={props.patient.id} />
            <ReviewItem label="Age" value={props.patient.age} />
            <ReviewItem label="Sim Time" value={props.patient.time.hour + ":" + props.patient.time.minute} />
            <ReviewItem label="Labs URL" value={props.patient.labDocURL} />
        </ReviewSection>


        {props.patient.allergies.length > 0 ?
            <ReviewSection title="Allergies">
                {props.patient.allergies.map((a, i) =>
                    <div key={i}>
                        <ReviewItem label={"Allergy " + i + " name"} value={a.name} />
                        <ReviewItem label={"Allergy " + i + " reaction"} value={a.reaction} />
                    </div>
                )}
            </ReviewSection>

            : <></>}

        {props.patient.immunizations.length > 0 ?
            <ReviewSection title="Immunizations">
                {props.patient.immunizations.map((m, i) =>
                    <ReviewItem label={"Immunization " + i} value={m} key={i} />
                )}
            </ReviewSection>

            : <></>}

        {props.patient.medicalHistory.length > 0 ?
            <ReviewSection title="Medical History">
                {props.patient.medicalHistory.map((m, i) =>
                    <div key={i}>
                        <ReviewItem label={"Medical History " + i + " date"} value={m.date} />
                        <ReviewItem label={"Medical History " + i + " title"} value={m.title} />
                        <ReviewItem label={"Medical History " + i + " notes"} value={m.notes} />
                    </div>
                )}
            </ReviewSection>

            : <></>}


        {props.patient.socialHistory.length > 0 ?
            <ReviewSection title="Social History">
                {props.patient.socialHistory.map((s, i) =>
                    <ReviewItem label={"Immunization " + i} value={s} key={i} />
                )}
            </ReviewSection>

            : <></>}

        {/* {props.patient.medicationOrders.length > 0 ?
            <ReviewSection title="Medication Order">
                {props.patient.medicationOrders.map((o, i) =>{
                    const db = Database.getInstance()
                    const med = db.getMedication(o.id)
                    return <div key={i}>
                        <ReviewItem label={"Order" + i} value={<MedicationOrderSyntax  med={med} order={o} />} />
                        <ReviewItem label={"Order" + i + "Type"} value={o.orderType} />
                    </div>
                }
                )}
            </ReviewSection>
            : <></>} */}
        {props.patient.customOrders.length > 0 ?
            <ReviewSection title="Custom Order">
                {props.patient.customOrders.map((o, i) =>
                    <div key={i}>
                        <ReviewItem label={"Custom Order" + i} value={o.order} />
                        <ReviewItem label={"Custom Order" + i + "Order Type"} value={o.orderType} />
                    </div>
                )}
            </ReviewSection>
            : <></>}

        {props.patient.studentReports.length > 0 ?
            <ReviewSection title="Charting">
                <table className="table-auto w-full border border-darkGray">
                    <thead>
                        <Tr>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Set Name</th>
                            <th>Field Name</th>
                            <th>Value</th>
                        </Tr>
                    </thead>
                    <tbody>
                        {props.patient.studentReports.map((r, i) =>
                            <Tr key={i}>
                                <Td>{r.date}</Td>
                                <Td>{r.time}</Td>
                                <Td>{r.setName}</Td>
                                <Td>{r.fieldName}</Td>
                                <Td>{r.value}</Td>
                            </Tr>

                        )}
                    </tbody>
                </table>
            </ReviewSection>
            : <></>}
    </BaseStage>
}


