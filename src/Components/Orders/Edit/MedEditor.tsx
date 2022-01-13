import React from 'react';
import PureModal from "react-pure-modal";
import { Medication } from '../../../Types/Medications';
import Button from '../../Form/Button';
import Input from '../../Form/Input';
type Props = {
    onUpdate: (med: Medication) => void,
    med?: Medication,
    onClose: ()=>void
}

type State = {
    barcode: string,
    name: string
}

export default class MedEditor extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        if(props.med) {
            this.state = {
                barcode: props.med.barcode,
                name: props.med.name
            }
        } else {
            this.state = {
                barcode: "",
                name: ""
            }
        }
    }

    onSaveHandler() {
        const med: Medication = {
            id: this.props.med?.id || "",
            barcode: this.state.barcode,
            name: this.state.name
        }

        this.props.onUpdate(med);
    }

    public render() {
        return (
            <PureModal isOpen={true} header={"Medication Editor"} width='40vw' onClose={this.props.onClose}>
                <div>
                    <Input onChange={e => this.setState({ barcode: e.currentTarget.value })} id='input' value={this.state.barcode} admin>Barcode</Input>
                    <Input onChange={e => this.setState({ name: e.currentTarget.value })} id='input' value={this.state.name} admin>Medication Name</Input>
                    <div className='flex justify-center'>
                        <Button admin onClick={this.onSaveHandler.bind(this)}>Save</Button>
                    </div>

                </div> 
            </PureModal>
        );
    }
}