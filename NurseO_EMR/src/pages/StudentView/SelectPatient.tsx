import React, { ChangeEvent } from 'react';
import Database from '../../Services/Database';
import { $history } from '../../Services/State';
import {getAuth} from "firebase/auth"
import Background from '../../Components/Background';
import SignInButton from '../../Components/Form/SignInButton';
type Props = {}
type State = {
    patientID: string,
    error: string,
}

export default class SelectPatient extends React.Component<Props,State> {

    private database;
    private ref;
    constructor(props: Props) {
        super(props);
        this.state = {
            patientID: "",
            error: ""
        }
        this.ref = React.createRef<HTMLInputElement>()
        this.database = Database.getInstance();
    }

    componentDidMount() {
        if(!getAuth().currentUser) $history.value.push("/")
    }

    onPatientNumberChange(event: ChangeEvent<HTMLInputElement>) {
        this.setState({patientID:event.target.value})
    }

    async onClickHandler(wait: () => void, keepGoing: () => void) {
        wait();
        const patientExist = await this.database.getPatient(this.state.patientID);
        if(patientExist) $history.value.push("/studentView/dashboard");
        else {
            keepGoing();
            this.setState({
                error: "patient not found",
                patientID: "",
            })
            this.ref.current?.focus()
        }
    }
    public render() {	
        return (
            <div>
                <Background /> 
                <div className="grid justify-center h-screen w-screen content-center text-center">
                    <form className="bg-white p-28 rounded-4xl border-primary/60 border-8" onSubmit={e=>e.preventDefault()}>
                        <h1 className="text-4xl font-bold">Please 
                           <span className="text-primary/80"> scan </span>
                         the patient armband</h1>
                        <input type="text" 
                            ref={this.ref}
                            autoFocus
                            className="my-5 border-2 rounded-full text-center p-4 border-primary w-full" 
                            placeholder="Or type the patient number here" 
                            onChange={this.onPatientNumberChange.bind(this)}
                            value={this.state.patientID}
                            
                            /><br />
                        <SignInButton onClick={this.onClickHandler.bind(this)} />
                        <div>{this.state.error}</div>
                    </form>
                </div>
            </div>
        );
    }	
}