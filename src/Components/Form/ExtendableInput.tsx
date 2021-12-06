import React from 'react';
import PureModal from 'react-pure-modal';
import Button from './Button';
import LabelInputWrapper from './LabelInputWrapper';

type Props = {
    id:string,
    label:string,
    className?: string,
    onSave?: ()=>void
}

type State = {
    showModal: boolean,
}
export default class ExtendableInput extends React.Component<Props,State> {

    constructor(props:Props) {
        super(props);
        this.state={
            showModal: false
        }
    }

    onAddClickedHandler() {
        this.setState({showModal: true})
    }

    onModalCloseHandler() {
        this.setState({showModal: false})
        if(this.props.onSave) this.props.onSave()
    }

    public render() {	
            return (
                <>
                    <LabelInputWrapper className={this.props.className}>
                        <label htmlFor={this.props.id}>{this.props.label}</label>
                        <Button id={this.props.id} className="rounded-full" onClick={this.onAddClickedHandler.bind(this)}>+</Button>
                    </LabelInputWrapper>
                    <PureModal isOpen={this.state.showModal} width="60vw" header={this.props.label}
                     onClose={this.onModalCloseHandler.bind(this)}>
                        <>
                            {this.props.children}
                            <Button onClick={this.onModalCloseHandler.bind(this)}>Save</Button>
                        </>

                    </PureModal>
                    
                </>
            )
    }	
}