import React, { ChangeEvent } from 'react';
import { FirebaseApp, FirebaseError, initializeApp } from "firebase/app";
import { getAuth, Auth, signInWithEmailAndPassword, browserLocalPersistence, setPersistence } from "firebase/auth";
// import {inMemoryPersistence} from "firebase/auth"
import firebaseConfig from "./../firebaseConfig.json";
import Logo from '../Components/Nav/TopMenu/Logo';
import { $history } from '../Services/State';
import Background from '../Components/Background';
type Props = {}
type State = {
    badgeNumber: string,
    error: string,
}

export default class Login extends React.Component<Props,State> {

    private app:FirebaseApp;
    private auth:Auth;

    constructor(props:Props) {
        super(props);
        this.app = initializeApp(firebaseConfig);
        this.auth = getAuth(this.app);
        console.log(this.auth.currentUser)
        this.state = {
            badgeNumber: "",
            error: ""
        }
    }

    async onClickHandler() {
            try {
                await setPersistence(this.auth, browserLocalPersistence)
                await signInWithEmailAndPassword(this.auth, `${this.state.badgeNumber}@simpleemr.com`, this.state.badgeNumber )
                if(this.auth.currentUser) $history.value.push("/studentView/selectPatient");
            } catch(e) {
                const error = e as FirebaseError; 
                this.setState({
                    error: error.message
                })
            }
    }

    onBadgeNumberChange(event:ChangeEvent<HTMLInputElement>) {
        this.setState({badgeNumber:event.target.value})
    }

    public render() {	
        return (
            
            <div>
                <Background /> 
                <div className="grid justify-center h-screen w-screen content-center text-center">
                    <div className="bg-white p-28 rounded-4xl border-red-500 border-8">
                        <Logo className="text-6xl mb-10" />
                        <h1 className="text-xl font-bold">Please Scan Your Badge</h1>
                        <input type="password" autoFocus
                            className="my-5 border-2 rounded-full text-center p-4 border-red-700 w-full" 
                            placeholder="Or type your badge number here" 
                            onChange={this.onBadgeNumberChange.bind(this)}
                            /><br />
                        <button onClick={this.onClickHandler.bind(this)} 
                            className="rounded-full bg-red-700 text-white p-4 font-bold tracking-wider w-full">Sign in</button>
                        <div>{this.state.error}</div>
                    </div>
                </div>
            </div>
        );
    }	
}