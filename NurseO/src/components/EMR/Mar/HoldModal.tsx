import { useState } from 'react';
import { Button } from '../Form/Button';
import { Dialog, DialogContent, DialogTitle } from '~/components/common/ui/dialog';

type Props = {
    onSubmit: (holdReason: string) => void
    onClose: () => void
}
export function HoldModal(props: Props) {
    const [holdReason, setHoldReason] = useState("");

    return <Dialog onOpenChange={e => e === false && props.onClose()} open={true}>
        <DialogContent className='min-w-[60vw]'>
            <DialogTitle>HOLD</DialogTitle>
            <form className='text-center' onSubmit={e => e.preventDefault()}>
                <h1 className='text-red-700 font-bold text-center text-2xl' >Indicate the reason for holding this medication</h1>
                <input id='medHold' value={holdReason} onChange={e => setHoldReason(e.currentTarget.value)}
                    className='block mx-auto border-2 border-red-700 h-12 w-7/12 rounded-full my-4 pl-10'
                    required />
                <Button className=' bg-primary' onClick={() => props.onSubmit(holdReason)}>Submit</Button>
            </form>
        </DialogContent>
    </Dialog>
}