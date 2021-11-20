import React, { ChangeEvent } from 'react';
import NotesInput from './NotesInput';
import EmptyCard from '../Dashboard/Card/EmptyCard';
import { $patient } from '../../Services/State';
import { Note } from '../../Types/PatientProfile';
import Database from '../../Services/Database';
import { getTodaysDateAsString } from '../../Services/Util';


type Props = {

}
type State = {
    date: string,
    title: string,
    note: string,
    loading: boolean
}
export default class WriteNote extends React.Component<Props,State> {

    constructor(props:Props){
        super(props);
        this.state = {
            date: getTodaysDateAsString(),
            note: "",
            title: "",
            loading: false
        }
    }

    async onSubmitHandler(event: React.MouseEvent<HTMLInputElement, MouseEvent>) {
        event.preventDefault();
        this.setState({loading:true})
        const patient = $patient.value;
        const {date, title, note} = this.state;
        const patientNote:Note = {date,title,note};
        const db = Database.getInstance();
        patient!.notes.push(patientNote);
        await db.updatePatient();
        this.setState({
            date: getTodaysDateAsString(),
            note: "",
            title: "",
            loading: false
        });
    }

    onDateChangeHandler(event: ChangeEvent<HTMLInputElement>) {
        this.setState({
            date: event.target.value
        })
    }

    onTitleChangeHandler(event: ChangeEvent<HTMLInputElement>) {
        this.setState({
            title: event.target.value
        })
    }


    onNoteChangeHandler(event: ChangeEvent<HTMLTextAreaElement>) {
        this.setState({
            note: event.target.value
        })
    }

    public render() {	
        return (
            <EmptyCard title="Nursing Notes">
                <form className="content-center grid px-10 py-4">
                    <h1 className="font-bold text-center text-xl mb-4">Please fill this form and type your notes here</h1>
                   <NotesInput onChange={this.onDateChangeHandler.bind(this)} value={this.state.date} type="date" id="notes_date">Date</NotesInput>

                   <NotesInput onChange={this.onTitleChangeHandler.bind(this)} value={this.state.title} type="text" id="notes_title">Title</NotesInput>

                   <label htmlFor="notes_note" className="font-bold">Note:</label>
                   <textarea onChange={this.onNoteChangeHandler.bind(this)} value={this.state.note} className="border-2 border-red-700 rounded-md p-4" name="" id="notes_note" cols={30} rows={10}></textarea>

                   <input type="submit" value={this.state.loading ? "Saving..." : "Save"}
                    className="mt-4 bg-red-700 text-white font-bold p-2 w-1/2 m-auto rounded-full cursor-pointer" 
                    onClick={this.onSubmitHandler.bind(this)}/>
                </form>
            </EmptyCard>

        );
    }	
}