import { Button, Input } from 'nurse-o-core';
import React from 'react';
import PureModal from "react-pure-modal"

type Props = {
    children: string,
    inputLabel: string,
    onSubmit: (value: string)=>any
}

type State = {
    showModal: boolean,
    value: string,
}
export default class ButtonWModalPrompt extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            showModal: false,
            value: ""
        }
    }


    onClickHandler() {
        this.setState({
            showModal: true
        })
    }

    onSubmitHandler() {
        this.setState({showModal: false})
        this.props.onSubmit(this.state.value);
    }


    render() {
        return (
            <div>
                <Button onClick={this.onClickHandler.bind(this)}>{this.props.children}</Button>
                <PureModal isOpen={this.state.showModal} width="40vw" header={this.props.children}>
                    <div>
                        <Input className='grid-flow-col' id={this.props.inputLabel}
                        onChange={e=> this.setState({value:e.currentTarget.value})}>
                            {this.props.inputLabel}
                        </Input>
                        <Button onClick={this.onSubmitHandler.bind(this)}>Submit</Button>
                    </div>
                </PureModal>
            </div>
        );
    }
}