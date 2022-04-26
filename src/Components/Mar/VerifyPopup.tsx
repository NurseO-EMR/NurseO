import React from 'react';
import PureModal from "react-pure-modal";
import {Button, Input} from "nurse-o-core"
import { MedSupply } from '../../Services/Core';
import XIcon from '../XIcon';

type Props = {
    med: MedSupply
    onVerified: ()=>void,
    onClose?: ()=>void
}

type State = {
    barcode: string,
    wrongMed: boolean
}
export default class VerifyPopup extends React.Component<Props, State> {

    constructor(props:Props) {
        super(props);
        this.state = {
            barcode: "",
            wrongMed: false
        }
    }

    onVerifyButtonClicked() {
        if(this.state.barcode === this.props.med.barcode) this.props.onVerified();
        else {
            this.setState({
                wrongMed: true
            })
        }
    }

     render() {	
        return (
            <PureModal isOpen={true} header={"Verification"} width="40vw" onClose={this.props.onClose}>
                <form onSubmit={e=>e.preventDefault()}>
                    <h1 className='font-bold text-center'>{this.props.med.name}</h1>
                    <h2 className='text-center my-2 text-red-700 font-bold'>Please scan the medication for verification</h2>
                    {this.state.wrongMed ?                     
                     <h3 className='text-center'><XIcon/> Wrong medication was scanned <XIcon/></h3>
                    : null}

                    <Input id='med' className='mx-auto' autoFocus autoComplete='disabled'
                     onChange={e=>this.setState({barcode: e.currentTarget.value})} />
                    <Button className='block mx-auto' onClick={this.onVerifyButtonClicked.bind(this)}>
                        Verify
                    </Button>
                </form>
            </PureModal>

        );
    }	
}