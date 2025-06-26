import { useContext, useState } from "react";
import EmptyCard from "./EmptyCard";
import TextArea from "../../Form/TextArea";
import { Button } from "../../Form/Button";
import { GlobalContext } from "~/services/State";
import { api } from "~/utils/api";
import { signInState } from "~/types/flags";
import { DialogClose, DialogContent, DialogTitle } from "~/components/common/ui/dialog";

type Props = React.HTMLAttributes<HTMLDivElement> & {
    chiefComplaint: string | undefined | null
}

export function ChiefComplaintCard(props: Props) {
    const [cc, setCC] = useState(props.chiefComplaint ?? "")
    const { patient, setPatient, studentId } = useContext(GlobalContext)
    const updateChiefCompliantMutation = api.emr.student_updateChiefCompliant.useMutation()

    const onEditClickHandler = async () => {
        if (studentId !== signInState.anonymousSignIn.valueOf()) await updateChiefCompliantMutation.mutateAsync({ patientId: patient.dbId, chiefCompliant: cc })
        patient.chiefComplaint = cc
        setPatient({ ...patient })
    }

    return <>
        <EmptyCard title="Chief Complaint" {...props} editable>
        <div className="py-5 px-4">
            {props.chiefComplaint ? props.chiefComplaint : "None provided yet"}
        </div>

            <DialogContent className="w-[40vw]">
                <DialogTitle>Edit Chief Complaint</DialogTitle>
            <div>
                <TextArea vertical label="Enter Chief Complaint" value={cc} onChange={e => setCC(e.currentTarget.value)} />
                    <DialogClose className="w-full">
                        <Button onClick={onEditClickHandler} className="bg-primary mt-4 w-10/12 mx-auto block h-14">Submit</Button>
                    </DialogClose>
            </div>
            </DialogContent>
        </EmptyCard>
    </>
}