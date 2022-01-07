import React from 'react';
import PureModal from "react-pure-modal";
import Button from './Button';

type Props = {
    className: string
    confirmPrompt: string
    onConfirm: ()=>void

}

type State = {
    showConfirm: boolean
}

export default class ButtonWConfirmBox extends React.Component<Props,State> {

    constructor(props:Props) {
        super(props);
        this.state = {
            showConfirm: false
        }
    }

    onClickHandler() {
        this.setState({
            showConfirm: true
        })
    }

    onNoClickHandler() {
        this.setState({showConfirm: false})
    }

    onYesClickHandler() {
        this.setState({showConfirm: false,})
        this.props.onConfirm();
    }

    public render() {	
        return (
            <>
            <Button onClick={this.onClickHandler.bind(this)} className={this.props.className}>{this.props.children}</Button>
            <PureModal isOpen={this.state.showConfirm} width='30vw' header="Confirm">
                <div>
                    <h1>{this.props.confirmPrompt}</h1>
                    <div className='mt-5'>
                        <Button onClick={this.onYesClickHandler.bind(this)}>Yes</Button>
                        <Button onClick={this.onNoClickHandler.bind(this)} admin>No</Button>
                    </div>
                </div>
            </PureModal>
            </>

        );
    }	
}