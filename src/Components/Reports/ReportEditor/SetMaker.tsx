import React from 'react';
import PureModal from "react-pure-modal";
import { Report, ReportSet, ReportType } from '../../../Types/Report';
import Button from '../../Form/Button';
import Input from '../../Form/Input';
import FieldMaker from './FieldMaker';
import ReportSetEditor from './ReportSetEditor';

type Props = {
    onSave?: (newSet: ReportSet) =>void,
    setType: ReportType,
    onClose?: ()=>void
}
type State = {
    setName: string,
    fields: Report[],
    showEditor: boolean
}

export default class SetMaker extends React.Component<Props,State> {
    constructor(props:Props) {
        super(props);
        this.state = {
            setName: "",
            fields: [],
            showEditor: false,
        }
    }

    onFieldAdded(fields:Report[]) {
        this.setState({fields})
    }

    onSubmit() {
        const set = this.makeSet();
        if(this.props.onSave) this.props.onSave(set);
    }

    makeSet() {
        const set: ReportSet = {
            name: this.state.setName,
            type: this.props.setType,
            reportFields: this.state.fields 
        }
        return set;
    }

    onEditHandler(sets: ReportSet[]) {
        this.setState({
            fields: sets[0].reportFields,
            showEditor: false
        })
    }

    public render() {	
        return (
            <PureModal isOpen={true} width='40vw' header={"Set Maker"} onClose={this.props.onClose}>
                <>
                    <form className='h-44'>
                        <Input admin id='setName' onChange={(e)=>this.setState({setName: e.currentTarget.value})}>Set Name</Input>
                        <FieldMaker onEditClickHandler={()=>this.setState({showEditor: true})} onSave={this.onFieldAdded.bind(this)} fields={this.state.fields}/>
                        <Button admin onClick={this.onSubmit.bind(this)}>Submit</Button>
                    </form>
                    {this.state.showEditor ? <ReportSetEditor reportSets={[this.makeSet()]} reportToBeEditedIndex={0} 
                    onClose={()=>this.setState({showEditor: false})} onSave={this.onEditHandler.bind(this)}/> : null}
                    
                </>
            </PureModal>

        );
    }	
}