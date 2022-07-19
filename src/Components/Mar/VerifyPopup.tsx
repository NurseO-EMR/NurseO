import { useState } from 'react';
import PureModal from "react-pure-modal";
import { Button, Input, Medication, MedicationLocation } from "nurse-o-core"
import {XIcon} from '../XIcon';

type Props = {
    med: Medication,
    location: MedicationLocation,

    onVerified: () => void,
    onClose?: () => void
}

export function VerifyPopup(props: Props) {
    const [barcode, setBarCode] = useState("")
    const [wrongMed, setWrongMed] = useState(false)


    const onVerifyButtonClicked = () => {
        if (barcode === props.location.barcode) props.onVerified();
        else setWrongMed(true)
    }

    return (
        <PureModal isOpen={true} header={"Verification"} width="40vw" onClose={props.onClose}>
            <form onSubmit={e => e.preventDefault()}>
                <h1 className='font-bold text-center'>{props.med.name}</h1>
                <h2 className='text-center my-2 text-red-700 font-bold'>Please scan the medication for verification</h2>
                {wrongMed ?
                    <h3 className='text-center'><XIcon /> Wrong medication was scanned <XIcon /></h3>
                    : null}

                <Input id='med' className='mx-auto' autoFocus autoComplete='disabled'
                    onChange={e => setBarCode(e.currentTarget.value )} />
                <Button className='block mx-auto' onClick={onVerifyButtonClicked}>
                    Verify
                </Button>
            </form>
        </PureModal>

    );
}	
