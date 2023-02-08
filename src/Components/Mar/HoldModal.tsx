import { useState } from 'react';
import PureModal from 'react-pure-modal';
import Button from '../Form/Button';

type Props = {
    onSubmit: (holdReason: string)=>void
    onClose: ()=>void
}
export function HoldModal(props:Props) {
    const [holdReason, setHoldReason] = useState("");

    return <PureModal isOpen={true} width="60vw" header="HOLD" onClose={props.onClose}>
        <form className='text-center' onSubmit={e=>e.preventDefault()}>
            <h1 className='text-red-700 font-bold text-center text-2xl' >Indicate the reason for holding this medication</h1>
            <input id='medHold' value={holdReason} onChange={e=>setHoldReason(e.currentTarget.value)}
             className='block mx-auto border-2 border-red-700 h-12 w-7/12 rounded-full my-4 pl-10'
             required />
             <Button onClick={()=>props.onSubmit(holdReason)}>Submit</Button>
        </form>
    </PureModal>
}