import { Button } from "nurse-o-core";
import { AddMedPrompt } from "../../Components/Meds/AddMedPrompt";
import PageView from "../PageView";

export function EditMedicationsPage() {
    return (
        <PageView>
            <Button>Add Medication</Button>
            <AddMedPrompt></AddMedPrompt>
        </PageView>
    )
}