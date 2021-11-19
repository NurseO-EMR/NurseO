import React, { ChangeEvent } from 'react';
import NotesInput from '../../Pages/StudentView/Notes/NotesInput';
import EmptyCard from '../Dashboard/Card/EmptyCard';


type Props = {

}
type State = {
    date: string,
    title: string,
    visitReason: string,
    note: string
}
export default class WriteNote extends React.Component<Props,State> {

    constructor(props:Props){
        super(props);
        this.state = {
            date: "",
            note: "",
            title: "",
            visitReason: ""
        }
    }

    onSubmitHandler(event: React.MouseEvent<HTMLInputElement, MouseEvent>) {
        event.preventDefault();
        

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

    onVisitReasonChangeHandler(event: ChangeEvent<HTMLInputElement>) {
        this.setState({
            visitReason: event.target.value
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

                   <NotesInput onChange={this.onVisitReasonChangeHandler.bind(this)} value={this.state.visitReason} type="text" id="notes_visit">Visit Reason</NotesInput>

                   <label htmlFor="notes_note" className="font-bold">Note:</label>
                   <textarea onChange={this.onNoteChangeHandler.bind(this)} value={this.state.note} className="border-2 border-red-700 rounded-md p-4" name="" id="notes_note" cols={30} rows={10}></textarea>

                   <input type="submit" value="submit"
                    className="mt-4 bg-red-700 text-white font-bold p-2 w-1/2 m-auto rounded-full cursor-pointer" 
                    onClick={this.onSubmitHandler.bind(this)}/>
                </form>
            </EmptyCard>

        );
    }	
}