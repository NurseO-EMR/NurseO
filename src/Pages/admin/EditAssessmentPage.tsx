import React, { ChangeEvent } from 'react';
import EmptyCard from '../../Components/Dashboard/Card/EmptyCard';
import Input from '../../Components/Input';
import ReportsSubmitter from '../../Components/Reports/ReportsSubmitter';
import SelectInput from '../../Components/SelectInput';
import { $reportSet } from '../../Services/State';
import { ReportSet } from '../../Types/Report';
import AdminViewPage from './AdminViewPage';

type Props = {

}

type State = {
    reportSetsForPreview: ReportSet[],
    reportSet: ReportSet | null,
    inputType: string,
}

export default class EditAssessmentPage extends React.Component<Props,State> {

    constructor(props:Props) {
        super(props);
        this.state = {
            reportSetsForPreview: [],
            reportSet: null,
            inputType: "text",
        }
    }

    updatePreview() {
        this.setState(state=>{
            if(state.reportSet) {
                return {
                    reportSetsForPreview: [state.reportSet!]
                }
            } else {
                return {
                    reportSetsForPreview: state.reportSetsForPreview
                }
            }
        })
    }

    onSetSelectedHandler(e:ChangeEvent<HTMLSelectElement>) {
        const reportSet: ReportSet = {
            name: "",
            reportFields: [],
            type: 'studentVitalsReport'
        }
        if(e.target.value === "new") {
           reportSet.name = e.target.value
        }
        this.setState({reportSet})
        this.updatePreview();
    }

    onNewSetNameChangeHandler(e:ChangeEvent<HTMLInputElement>) {
        this.setState(state=>{
            const reportSet = state.reportSet!;
            reportSet.name = e.target.value;
            return {reportSet}
        })
        this.updatePreview();
    }

    onFiledNameChangeHandler(e: ChangeEvent<HTMLInputElement>) {
        this.setState(state=>{
            const reportSet = state.reportSet!;
            reportSet.reportFields.push({
                name: e.target.value,
                fieldType: "text",
                VitalsOptions: []
            })
            return {reportSet}
        })
        this.updatePreview();
    } 

    onFiledInputTypeChangeHandler(e: ChangeEvent<HTMLSelectElement>) {
        this.setState(state=>{
            const reportSet = state.reportSet!;
            reportSet.reportFields[reportSet.reportFields.length-1].fieldType = e.target.value as "number" | "text" | "T/F" | "options"
            return {
                reportSet,
                inputType: e.target.value
            }
        })
       this.updatePreview();
    }

    onOptionsNameChangeHandler(e: ChangeEvent<HTMLInputElement>) {
        this.setState(state=>{
            const reportSet = state.reportSet!;
            reportSet.reportFields[reportSet.reportFields.length-1].VitalsOptions!.push({
                name: e.target.value,
                abbreviation: e.target.value
            })
            return {reportSet}
        })
        this.updatePreview();
    }

    onOptionsAbbreviationChangeHandler(e: ChangeEvent<HTMLInputElement>) {
        this.setState(state=>{
            const reportSet = state.reportSet!;
            const reportFields = reportSet.reportFields[reportSet.reportFields.length-1];
            const options = reportFields.VitalsOptions![reportFields.VitalsOptions!.length-1];
            options.abbreviation = e.target.value
            return {reportSet}
        })
       this.updatePreview();
    }

    onSubmitHandler() {
        console.log(this.state.reportSetsForPreview[0])
    }

    public render() {	
        return (
            <AdminViewPage selected="Edit Assessment">
                    <ReportsSubmitter reportType={'studentVitalsReport'} preview reportSets={this.state.reportSetsForPreview} />
                    <EmptyCard title="Edit Assessments">
                        <div className="flex flex-col px-20 py-5 w-full">
                            <SelectInput label="Select The Assessment" onChange={this.onSetSelectedHandler.bind(this)}>
                                <option value=""></option>
                                {$reportSet.value.map((reportSet,i)=><option key={i} value={reportSet.name}>{reportSet.name}</option>)}
                                <option value="new">Create New Set</option>
                            </SelectInput>
                            {!this.state.reportSet?.name ? <Input id="newSet" onChange={this.onNewSetNameChangeHandler.bind(this)}>New Set Name</Input> : null}
                            {this.state.reportSet?.name ? 
                            <>
                                <Input id="AdminAssessmentName" type="text" onChange={this.onFiledNameChangeHandler.bind(this)}>Name</Input>
                                <SelectInput label="Input Type" onChange={this.onFiledInputTypeChangeHandler.bind(this)}>
                                    <option value=""></option>
                                    <option value="text">Text</option>
                                    <option value="number">Number</option>
                                    <option value="T/F">Checkbox</option>
                                    <option value="options">Selected Options</option>
                                </SelectInput>
                                {this.state.inputType === "options" ?
                                    <>
                                     <Input id="optionsName" onChange={this.onOptionsNameChangeHandler.bind(this)}>Options Name</Input>
                                     <Input id="optionsAbbreviation" onChange={this.onOptionsAbbreviationChangeHandler.bind(this)}>Options Abbreviation</Input>
                                    </>
                                : null}
                            </>
                        : null}
                        <input id="submit" type="submit" className="bg-red-700 font-bold text-white w-1/2 m-auto h-10 cursor-pointer rounded-xl" onClick={this.onSubmitHandler.bind(this)} />
                        </div>
                    </EmptyCard>
            </AdminViewPage>

        );
    }	
}