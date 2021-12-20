import React from 'react';
import PureModal from 'react-pure-modal';
import Button from './Button';
import LabelInputWrapper from './LabelInputWrapper';

type Props = {
    id:string,
    label:string,
    className?: string,
    onSave?: ()=>void,
    editable?: boolean,
    onEditClick?:()=>void,
    devShow?: boolean
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
        if(this.props.onSave) this.props.onSave()
        this.setState({showModal: false})
    }


    public render() {	
            return (
                <>
                    <LabelInputWrapper className={this.props.className}>
                        <label htmlFor={this.props.id}>{this.props.label}</label>
                        {this.props.editable ? 
                            <Button onClick={this.props.onEditClick} 
                                className="col-span-2 bg-yellow-600" id={`${this.props.id}_Edit`}>&#9998;</Button> 
                        : null }
                        <Button id={this.props.id} className={this.props.editable ? "col-span-1" : "col-span-3"}
                         onClick={this.onAddClickedHandler.bind(this)}>+</Button>
                    </LabelInputWrapper>
                    <PureModal isOpen={this.props.devShow || this.state.showModal} width="60vw" header={this.props.label}
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