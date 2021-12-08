import React from 'react';
import { uniqBy } from 'lodash';
import { Allergy } from '../../../Types/PatientProfile';
import ExtendableInput from '../../Form/ExtendableInput';
import Input from '../../Form/Input';
import DataPreviewer from './DataPreviewer';

type Props = {
    allergies: Allergy[],
    onUpdate: (updatedData: Allergy[])=>void
}
type State = {
    name: string,
    reaction: string,
    showModal: boolean,
}
export default class AllergiesInput extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            name: "",
            reaction: "",
            showModal: false
        }
    }

    onClickHandler() {
        const { name, reaction }: Allergy = this.state;
        let allergies = new Array(...this.props.allergies);
        allergies.push({ name, reaction });
        allergies = uniqBy(allergies, "name");
        this.props.onUpdate(allergies);
    }

    public render() {
        return (
            <div>
                <ExtendableInput id="allergies" label="Allergies" onEditClick={() => this.setState({ showModal: true })}
                    editable={this.props.allergies.length > 0}
                    onSave={this.onClickHandler.bind(this)}>
                    <Input className="w-7/12" id="name" onChange={e => this.setState({ name: e.currentTarget.value })}>Allergy Name</Input>
                    <Input className="w-7/12" id="reaction" onChange={e => this.setState({ reaction: e.currentTarget.value })}>Allergy Reaction</Input>
                </ExtendableInput>
                <DataPreviewer  onClose={() => this.setState({ showModal: false })}
                    onItemDeleted={data=>this.props.onUpdate(data as Allergy[])}
                    data={this.props.allergies} show={this.state.showModal} />
            </div>
        );
    }
}