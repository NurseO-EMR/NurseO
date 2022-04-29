import { Button, Input } from 'nurse-o-core';
import { useState } from 'react';
import PureModal from "react-pure-modal"

type Props = {
    children: string,
    inputLabel: string,
    onSubmit: (value: string) => any
}

export default function ButtonWModalPrompt(props: Props) {

    const [showModal, setShowModal] = useState(false)
    const [value, setValue] = useState("")


    const onSubmitHandler = ()=>{
        setShowModal(false)
        props.onSubmit(value)
    }


    return (
        <div>
            <Button onClick={()=>setShowModal(true)}>{props.children}</Button>
            <PureModal isOpen={showModal} width="40vw" header={props.children}>
                <div>
                    <Input className='grid-flow-col' id={props.inputLabel}
                        onChange={e => setValue(e.currentTarget.value)}>
                        {props.inputLabel}
                    </Input>
                    <Button onClick={onSubmitHandler}>Submit</Button>
                </div>
            </PureModal>
        </div>
    );
}
