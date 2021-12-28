import React from 'react';
import PureModal from "react-pure-modal";
import { ReportOption, ReportSet } from '../../../Types/Report';
import Button from '../../Form/Button';
import ComplexInput from '../../Form/ComplexInput';


type Props = {
    reportSets: ReportSet[],
    reportToBeEditedIndex: number,
    onSave?: (updatedDate: ReportSet[]) => void,
    onClose?: ()=>void
}

type State = {
    reportSets: ReportSet[]
}


export default class ReportSetEditor extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            reportSets: this.props.reportSets
        }
    }

    onOptionsChanges(index: number, updatedOptions: ReportOption[]) {
        const { reportSets } = this.state;
        reportSets[this.props.reportToBeEditedIndex].reportFields[index].VitalsOptions = updatedOptions;
        this.setState({
            reportSets
        })

    }

    onDeleteClickHandler(index: number) {
        const { reportSets } = this.state;
        reportSets[this.props.reportToBeEditedIndex].reportFields.splice(index,1);
        this.setState({reportSets});
    }

    onSave() {
        if(this.props.onSave) this.props.onSave(this.state.reportSets);
    }

    render() {
        const report = this.state.reportSets[this.props.reportToBeEditedIndex];
        return (
            <PureModal isOpen={true} width='60vw' header={report.name} onClose={this.props.onClose}>
                <>
                    <table className='w-11/12 text-center m-auto border-2 border-admin'>
                        <thead>
                            <tr>
                                <td className='border-2 border-admin'>Name</td>
                                <td className='border-2 border-admin'>Type</td>
                                <td className='border-2 border-admin'>Options ( if applicable )</td>
                                <td className='border-2 border-admin'>Delete</td>
                            </tr>
                        </thead>
                        <tbody>
                            {report.reportFields.map((field, i) =>
                                <tr className='odd:bg-gray-100 even:bg-gray-300 h-14 border-2 border-admin' key={i}>
                                    <td className='border-2 border-admin'>{field.name}</td>
                                    <td className='border-2 border-admin'>{field.fieldType}</td>
                                    <td className='border-2 border-admin'>
                                        {field.VitalsOptions ?
                                            <ComplexInput admin data={field.VitalsOptions} onUpdate={data => this.onOptionsChanges(i, data)} defaultType={new ReportOption()} title={""} />
                                            : null}
                                    </td>
                                    <td className='border-2 border-admin'><Button admin onClick={()=>this.onDeleteClickHandler(i)}>Delete</Button></td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    <div className='mt-3 flex justify-end w-11/12'>
                        <Button admin onClick={this.onSave.bind(this)}>Save</Button>
                    </div>
                </>
            </PureModal>
        )



    }
}