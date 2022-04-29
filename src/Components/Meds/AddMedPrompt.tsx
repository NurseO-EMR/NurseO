import { Button, Input } from "nurse-o-core"
import PureModal from "react-pure-modal"
export function AddMedPrompt() {
    return (
        <PureModal isOpen={true} width="30vw" header="Add Medication">
            <div>
                <Input id="medBarCode">Bar code</Input>
                <Input id="medName">Name</Input>
                <Button>Submit</Button>
            </div>
        </PureModal>
    )
}