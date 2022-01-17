import React from 'react';
import PureModal from 'react-pure-modal';
import Button from './Button';
import LabelInputWrapper from './LabelInputWrapper';

type Props = {
    id:string,
    label?:string,
    className?: string,
    onSave?: ()=>void,
    editable?: boolean,
    onEditClick?:(forceShowModal: ()=>void)=>void,
    hideSaveButton?: boolean,
    hideAddButton?: boolean,
    admin?: boolean,
    hideEditButton?: boolean,
    hideLabel?: boolean
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
    }

    onSave() {
        if(this.props.onSave) this.props.onSave()
        this.onModalCloseHandler();
    }

    showModal() {
        this.setState({
            showModal: true
        })
    }

    onEditClickHandler() {
        if(this.props.onEditClick) this.props.onEditClick(this.showModal.bind(this));
    }


    public render() {	
            return (
                <>
                    <LabelInputWrapper className={this.props.className}>
                        {/* edit button */}
                        {this.props.label === "" || this.props.hideLabel? null :  <label htmlFor={this.props.id}>{this.props.label}</label>}
                        {this.props.editable && !this.props.hideEditButton? 
                            <Button onClick={this.onEditClickHandler.bind(this)} admin={this.props.admin}
                                className="col-span-2 bg-edit h-9" id={`${this.props.id}_Edit`}>&#9998;</Button> 
                        : null }

                        {/* add button */}
                        {!this.props.hideAddButton ? 
                        <Button id={this.props.id} className={this.props.editable ? "col-span-1 h-9" : "col-span-3 h-9"}
                         admin={this.props.admin}    
                         onClick={this.onAddClickedHandler.bind(this)}>+</Button>
                        : null}
                        
                    </LabelInputWrapper>

                    {/* the modal */}
                    <PureModal isOpen={this.state.showModal} width="60vw" header={this.props.label}
                     onClose={this.onModalCloseHandler.bind(this)} draggable>
                        <>
                            {this.props.children}
                            {!this.props.hideSaveButton ? <Button  admin={this.props.admin} className='bg-admin' onClick={this.onSave.bind(this)}>Save</Button>: null}
                        </>

                    </PureModal>
                    
                </>
            )
    }	
}