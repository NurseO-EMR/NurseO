import { useState } from 'react';
import PureModal from "react-pure-modal";
import { Medication } from "nurse-o-core"
import { Input } from "../Form/Input"
import { Button } from "../Form/Button"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileContract } from '@fortawesome/free-solid-svg-icons';

type Props = {
    med: Medication,
    onClose?: () => void
}

export function NarcoticCountModel(props: Props) {

    const [reportSubmitted, setReportSubmitted] = useState(false)

    const onReportClickHandler = ()=>{
        setReportSubmitted(true)
    }

    if(reportSubmitted) {
        return <PureModal isOpen={true} header={"Narcotic Count Verification"} width="40vw" 
        onClose={()=>setReportSubmitted(false)}>
            <div className='text-center'>
                <FontAwesomeIcon className='text-primary text-6xl' icon={faFileContract} />
                <h1 className='font-bold text-md my-2'>Report has been submitted and all needed parties has been notified</h1>
                <Button className='block mx-auto w-80 my-2 bg-primary' onClick={props.onClose}>Go Back</Button>
            </div>
            
        </PureModal>
    }


    return (
        <PureModal isOpen={true} header={"Narcotic Count Verification"} width="40vw" onClose={props.onClose}>
            <form onSubmit={e => e.preventDefault()}>
                <h1 className='font-bold text-center'>
                    {props.med.genericName ? props.med.genericName : null} 
                    {props.med.brandName ? "( " + props.med.brandName + " )" : null} 
                </h1>
                <h2 className='text-center my-2 text-primary font-bold'>Narcotic count must be completed</h2>
                <div className='flex justify-around'>
                    <div>
                        <label className='font-bold block text-center my-2' htmlFor="expectedCount">Expected Count</label>
                        <Input className='bg-gray-400' value={Math.floor(Math.random() * 30 + 10)} disabled />
                    </div>
                    <div>
                        <label className='font-bold block text-center my-2' htmlFor="expectedCount">Current Count</label>
                        <Input type='number'/>
                    </div>
                </div>

                <Button className='block mx-auto w-80 my-4 bg-green-700' onClick={props.onClose}>
                    Completed Narcotic Count
                </Button>

                <Button className='block mx-auto w-80 my-4 bg-primary' onClick={onReportClickHandler}>
                    Report Narcotic Discrepancy
                </Button>
            </form>
        </PureModal>
    );
}	
