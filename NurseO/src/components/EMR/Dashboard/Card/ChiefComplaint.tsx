import { useContext, useState } from "react";
import EmptyCard from "./EmptyCard";
import PureModel from "react-pure-modal"
import TextArea from "../../Form/TextArea";
import { Button } from "../../Form/Button";
import { GlobalContext } from "~/services/State";
import { api } from "~/utils/api";
import { signInState } from "~/types/flags";

type Props = React.HTMLAttributes<HTMLDivElement> & {
    chiefComplaint: string | undefined | null
}

export function ChiefComplaintCard(props: Props) {
    const [openModel, setOpenModel] = useState(false)
    const [cc, setCC] = useState(props.chiefComplaint ?? "")
    const { patient, setPatient, studentId } = useContext(GlobalContext)
    const updateChiefCompliantMutation = api.patient.student_updateChiefCompliant.useMutation()

    const onEditClickHandler = async () => {
        if (studentId !== signInState.anonymousSignIn.valueOf()) await updateChiefCompliantMutation.mutateAsync({ patientId: patient.dbId, chiefCompliant: cc })
        patient.chiefComplaint = cc
        setPatient({ ...patient })
        setOpenModel(false)
    }

    return <EmptyCard title="Chief Complaint" {...props} editable onEditClick={() => setOpenModel(true)}>
        <div className="py-5 px-4">
            {props.chiefComplaint ? props.chiefComplaint : "None provided yet"}
        </div>

        <PureModel isOpen={openModel} onClose={() => setOpenModel(false)} header={"Edit Chief Complaint"} width="60vw">
            <div>
                <TextArea vertical label="Enter Chief Complaint" value={cc} onChange={e => setCC(e.currentTarget.value)} />
                <Button onClick={onEditClickHandler} className="bg-primary mt-4 w-10/12 mx-auto block h-14">Submit</Button>
            </div>
        </PureModel>
    </EmptyCard>
}