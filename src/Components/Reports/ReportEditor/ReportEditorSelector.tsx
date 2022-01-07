import React from 'react';
import { filter } from 'lodash';
import Database from '../../../Services/Database';
import { ReportSet, ReportType } from '../../../Types/Report';
import Button from '../../Form/Button';
import ReportSetEditor from './ReportSetEditor';
import EmptyCard from '../../Dashboard/Card/EmptyCard';
import { $settings } from '../../../Services/State';
import SetMaker from './SetMaker';


type Props = {
    reportType: ReportType
}
type State = {
    reportSets: ReportSet[],
    showEditor: boolean,
    editIndex: number,
    showSetMaker: boolean
}
export default class ReportEditorSelector extends React.Component<Props, State> {

    private totalReportSets:ReportSet[];

    constructor(props: Props) {
        super(props);
        this.totalReportSets = []
        this.state = {
            reportSets: [],
            showEditor: false,
            editIndex: -1,
            showSetMaker: false
        }
    }

    async componentDidMount() {
        const db = Database.getInstance();
        const settings = await db.getSettings();
        let reportSets = settings?.reportSet;


        if (reportSets) {
            this.totalReportSets = reportSets;
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
            const otherReportSets = filter(this.totalReportSets, type=>type.type !== this.props.reportType)
            settings.reportSet = [...this.state.reportSets, ...otherReportSets];
            $settings.next(settings);
            db.updateSettings();
        } 
    }

    onNewSetAddHandler(set: ReportSet) {
        const {reportSets} = this.state;
        reportSets.push(set);
        this.setState({
            reportSets,
            showSetMaker: false
        })
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
                    <Button admin onClick={()=>this.setState({showSetMaker: true})}>Add Set</Button>
                    <Button admin onClick={this.onSaveClickHandler.bind(this)}>Save</Button>
                </div>
                {this.state.showEditor ? <ReportSetEditor reportSets={this.state.reportSets} reportToBeEditedIndex={this.state.editIndex}
                    onSave={this.onEditorSave.bind(this)} onClose={this.onEditorClose.bind(this)}
                /> : null}

                {this.state.showSetMaker ? <SetMaker onClose={()=>this.setState({showSetMaker: false})}
                 setType={this.props.reportType} onSave={this.onNewSetAddHandler.bind(this)} /> : null}
            </EmptyCard>

        );
    }
}