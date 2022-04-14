import React, { ChangeEvent } from 'react';
import {Router} from "react-router-dom";
import {getAuth} from "firebase/auth"
import { $history, Background, SignInButton} from "nurse-o-core"
import {Database} from "./../Services/Database"
type Props = {}
type State = {
    patientID: string,
    error: string,
}

export class SelectPatient extends React.Component<Props,State> {

    private database;
    constructor(props: Props) {
        super(props);
        this.state = {
            patientID: "",
            error: ""
        }
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
        if(patientExist) $history.value.push("/dashboard");
        else {
            keepGoing();
            this.setState({error: "patient not found"})
        }
    }
    public render() {	
        return (
            <Router history={$history.value}>
                <Background /> 
                <div className="grid justify-center h-screen w-screen content-center text-center">
                    <form className="bg-white p-28 rounded-4xl border-red-500 border-8" onSubmit={e=>e.preventDefault()}>
                        <h1 className="text-4xl font-bold">Please 
                           <span className="text-red-600"> scan </span>
                         the patient armband</h1>
                        <input type="text" 
                            className="my-5 border-2 rounded-full text-center p-4 border-red-700 w-full" 
                            placeholder="Or type the patient number here" 
                            onChange={this.onPatientNumberChange.bind(this)}
                            /><br />
                        <SignInButton onClick={this.onClickHandler.bind(this)} />
                        <div>{this.state.error}</div>
                    </form>
                </div>
            </Router>
        );
    }	
}