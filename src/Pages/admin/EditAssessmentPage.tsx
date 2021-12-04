import React, { ChangeEvent } from 'react';
// import EmptyCard from '../../Components/Dashboard/Card/EmptyCard';
// import Input from '../../Components/Input';
// import ReportsSubmitter from '../../Components/Reports/ReportsSubmitter';
// import SelectInput from '../../Components/SelectInput';
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
                    
            </AdminViewPage>

        );
    }	
}