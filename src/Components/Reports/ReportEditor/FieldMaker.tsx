import React from 'react';
import { Report, ReportInputType, ReportOption } from '../../../Types/Report';
import ComplexInput from '../../Form/ComplexInput';
import ExtendableInput from '../../Form/ExtendableInput';
import Input from '../../Form/Input';
import SelectInput from '../../Form/SelectInput';


type Props = {
    onSave: (newField: Report[]) => void,
    onEditClickHandler?: ()=>void
    fields: Report[]
}
type State = {
    fieldName: string,
    fieldType: ReportInputType,
    options: ReportOption[],
}
export default class FieldMaker extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            fieldName: "",
            fieldType: "NA",
            options: [],
        }
    }

    onAddClickHandler() {
        const report: Report = {
            name: this.state.fieldName,
            fieldType: this.state.fieldType,
            VitalsOptions: this.state.options
        }

        const fields = this.props.fields;
        fields.push(report);

        this.props.onSave(fields);
    }


    onItemDeletedHandler(data:Object[]) {
        const felids = data as Report[]
        if(this.props.onSave) this.props.onSave(felids);
    }

    public render() {
        return (
            <>
                <ExtendableInput id='fieldName' label='Fields' onSave={this.onAddClickHandler.bind(this)} admin
                    editable={this.props.fields.length > 0} onEditClick={this.props.onEditClickHandler}>

                    <Input admin id='filedName' onChange={e => this.setState({ fieldName: e.currentTarget.value })}>Field Name</Input>
                    <SelectInput admin label='Filed Type' onChange={e => this.setState({ fieldType: e.currentTarget.value as ReportInputType })}>
                        <option></option>
                        <option>Number</option>
                        <option>text</option>
                        <option>T/F</option>
                        <option>checkbox</option>
                        <option>options</option>
                    </SelectInput>
                    {this.state.fieldType === "options" || this.state.fieldType === "checkbox" ?
                        <ComplexInput data={this.state.options} title='Options' admin onUpdate={options => this.setState({ options })} defaultType={new ReportOption()} />
                        : null}
                </ExtendableInput>

            </>
        );
    }
}