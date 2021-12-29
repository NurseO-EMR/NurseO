import React from 'react';
import { filter } from 'lodash';
import Database from '../../../Services/Database';
import { ReportSet, ReportType } from '../../../Types/Report';
import Button from '../../Form/Button';
import ReportSetEditor from './ReportSetEditor';
import EmptyCard from '../../Dashboard/Card/EmptyCard';
import { $settings } from '../../../Services/State';


type Props = {
    reportType: ReportType
}
type State = {
    reportSets: ReportSet[],
    showEditor: boolean,
    editIndex: number
}
export default class ReportEditorSelector extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            reportSets: [],
            showEditor: false,
            editIndex: -1
        }
    }

    async componentDidMount() {
        const db = Database.getInstance();
        const settings = await db.getSettings();
        let reportSets = settings?.reportSet;
        console.log(reportSets)


        if (reportSets) {
            reportSets = filter(reportSets, { type: this.props.reportType })
            this.setState({
                reportSets: reportSets
            })
        }
    }

    onEditClickHandler(index: number) {
        this.setState({
            showEditor: true,
            editIndex: index
        })
    }

    onEditorSave(updatedReports: ReportSet[]) {
        this.setState({
            reportSets: updatedReports,
            editIndex: -1,
            showEditor: false,
        });
    }

    onEditorClose() {
        this.setState({
            editIndex: -1,
            showEditor: false,
        })
    }

    async onSaveClickHandler() {
        const db = Database.getInstance();
        const settings = await db.getSettings();
        if(settings){
            settings.reportSet = this.state.reportSets;
            $settings.next(settings);
            db.updateSettings();
        } 

    }

    public render() {
        return (
            <EmptyCard title={`${this.props.reportType === 'studentAssessmentReport' ? "Assessment" : "Vitals"} Editor`} admin className='w-70vw block m-auto'>
                <table className='w-full'>
                    <thead>
                        <tr className='h-12'>
                            <th>Set Name</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody className='text-center'>
                        {this.state.reportSets.map((reportSet, i) =>
                            <tr key={i} className='odd:bg-gray-100 even:bg-gray-300 h-14'>
                                <td>{reportSet.name}</td>
                                <td><Button admin onClick={() => this.onEditClickHandler(i)}>Edit</Button></td>
                                <td><Button className='bg-primary'>Delete</Button></td>
                            </tr>
                        )}
                    </tbody>
                </table>
                <div className='flex justify-end w-10/12 mt-5'>
                    <Button admin onClick={this.onSaveClickHandler.bind(this)}>Save</Button>
                </div>
                {this.state.showEditor ? <ReportSetEditor reportSets={this.state.reportSets} reportToBeEditedIndex={this.state.editIndex}
                    onSave={this.onEditorSave.bind(this)} onClose={this.onEditorClose.bind(this)}
                /> : null}
            </EmptyCard>

        );
    }
}