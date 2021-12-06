import React from 'react';
import { Allergy } from '../../../Types/PatientProfile';
import ExtendableInput from '../../Form/ExtendableInput';
import Input from '../../Form/Input';

type Props = {
    onSave: (data:Allergy)=>void
}
type State = {
    name: string,
    reaction: string
}
export default class AllergiesInput extends React.Component<Props, State> {

    constructor(props:Props) {
        super(props);
        this.state = {
            name: "",
            reaction: ""
        }
    }

    onClickHandler() {
        const data:Allergy = {...this.state}
        this.props.onSave(data);
    }

    public render() {	
        return (
            <ExtendableInput id="allergies" label="Allergies" onSave={this.onClickHandler.bind(this)}>
                <Input className="w-7/12" id="name" onChange={e=>this.setState({name: e.currentTarget.value})}>Allergy Name</Input>
                <Input className="w-7/12" id="reaction" onChange={e=>this.setState({reaction: e.currentTarget.value})}>Allergy Reaction</Input>
            </ExtendableInput>

        ); 
    }	
}