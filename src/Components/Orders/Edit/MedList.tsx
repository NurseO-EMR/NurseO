import { filter } from 'lodash';
import React from 'react';
import Database from '../../../Services/Database';
import { Medication } from '../../../Types/Medications';
import EmptyCard from '../../Dashboard/Card/EmptyCard';
import Button from '../../Form/Button';
import ButtonWConfirmBox from '../../Form/ButtonWConfirmBox';
import MedEditor from './MedEditor';

type Props = {

}

type State = {
    medications: Medication[],
    showEditor: boolean,
    medEditIndex: number
    showAdder: boolean
}
export default class MedList extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            medications: [],
            showEditor: false,
            medEditIndex: -1,
            showAdder: false,
        }
    }

    async componentDidMount() {
        const db = Database.getInstance();
        const medications = await db.getMedications();
        this.setState({ medications });
    }


    async onMedAddedClickHandler(med: Medication) {
        if(filter(this.state.medications, {barcode: med.barcode}).length > 0) {
            alert("Error: medication has duplicated barcode");
        } else {
            const db = Database.getInstance();
            await db.addMedication(med);
            this.setState({showAdder: false})
            await this.updateList();
        }
    }

    onEditClickHandler(index: number) {
        this.setState({
            showEditor: true,
            medEditIndex: index
        })
    }

    async onDeleteClickHandler(index: number) {
        const {medications} = this.state;
        const db = Database.getInstance();
        const medID = medications[index].id;
        await db.removeMedication(medID);
        await this.updateList();
    }

    async onMedEdited(med:Medication) {
        const {medications} = this.state;
        const db = Database.getInstance();
        await db.updateMedication(med);

        medications[this.state.medEditIndex] = med;
        this.setState({
            medications,
            medEditIndex: -1,
            showEditor: false
        })

    }

    async updateList() {
        const db = Database.getInstance();
        const meds = await db.getMedications();
        this.setState({
            medications: meds
        })
    }

    public render() {
        return (
            <EmptyCard title='Medications' admin className='w-70vw block m-auto'>
                <table className='w-full'>
                    <thead>
                        <tr>
                            <th>Barcode</th>
                            <th>Name</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.medications.map((med, i) =>
                            <tr key={i} className='odd:bg-gray-100 even:bg-gray-300 h-14 text-center'>
                                <td>{med.barcode}</td>
                                <td>{med.name}</td>
                                <td><Button admin onClick={() => this.onEditClickHandler(i)}>Edit</Button></td>
                                <td><ButtonWConfirmBox className='bg-primary' onConfirm={() => this.onDeleteClickHandler(i)} 
                                confirmPrompt={`Are you sure you want to delete ${this.state.medications[i].name}?`}
                                >Delete</ButtonWConfirmBox></td>
                            </tr>

                        )}
                    </tbody>
                </table>
                <div className='flex flex-row-reverse'>
                    <div className='block w-144 -mr-64'>
                        <Button admin className='mt-3 mb-2' onClick={()=>this.setState({showAdder: true})}>Add Medication</Button>


                        {this.state.showEditor ? <MedEditor onUpdate={this.onMedEdited.bind(this)} med={this.state.medications[this.state.medEditIndex]} 
                        onClose={()=>this.setState({showEditor: false})} />: null} 
                        {this.state.showAdder ? <MedEditor onUpdate={this.onMedAddedClickHandler.bind(this)} onClose={()=>this.setState({showAdder: false})} /> : null}
                    </div>
                </div>
            </EmptyCard>

        );
    }

}