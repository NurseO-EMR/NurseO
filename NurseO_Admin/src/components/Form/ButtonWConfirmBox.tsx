import PureModal from "react-pure-modal";
import { Button } from "./Button";
import "react-pure-modal/dist/react-pure-modal.min.css";
import { useState } from "react";

type Props = {
    className?: string
    confirmPrompt: string
    onConfirm: () => void
    children: string

}

export function ButtonWConfirmBox(props: Props) {

    const [showConfirm, setShowConfirm] = useState(false);

    const onYesClickHandler = () => {
        setShowConfirm(false)
        props.onConfirm();
    }

    return (
        <>
            <Button onClick={() => setShowConfirm(true)} className={props.className}>{props.children}</Button>
            <PureModal isOpen={showConfirm} width='30vw' header="Confirm" onClose={()=>setShowConfirm(false)}>
                <div>
                    <h1 className="text-center font-bold">{props.confirmPrompt}</h1>
                    <div className='mt-5 flex gap-4'>
                        <Button onClick={()=>setShowConfirm(false)} className="bg-darkGray">No</Button>
                        <Button onClick={onYesClickHandler} className="bg-blue">Yes</Button>
                    </div>
                </div>
            </PureModal>
        </>

    );
}	
