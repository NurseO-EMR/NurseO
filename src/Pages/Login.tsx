import React, { ChangeEvent } from 'react';
import { FirebaseApp, FirebaseError, initializeApp } from "firebase/app";
import { getAuth, Auth, signInWithEmailAndPassword, browserLocalPersistence, setPersistence, GoogleAuthProvider, signInWithPopup, inMemoryPersistence, createUserWithEmailAndPassword } from "firebase/auth";
import GoogleButton from 'react-google-button';
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
        this.state = {
            badgeNumber: "",
            error: ""
        }
    }

    async onClickHandler() {
            try {
                await setPersistence(this.auth, inMemoryPersistence)
                await signInWithEmailAndPassword(this.auth, `${this.state.badgeNumber}@nurseO.app`, this.state.badgeNumber )
                if(this.auth.currentUser) $history.value.push("/studentView/selectPatient");
            } catch(e) {
                console.log(e)
                try {
                    const error = e as FirebaseError; 
                    if(error.code === "auth/user-not-found") {
                        await createUserWithEmailAndPassword(this.auth, `${this.state.badgeNumber}@nurseo.app`, this.state.badgeNumber)
                        await signInWithEmailAndPassword(this.auth, `${this.state.badgeNumber}@nurseo.app`, this.state.badgeNumber )
                        if(this.auth.currentUser) $history.value.push("/studentView/selectPatient");
                    } else {
                        this.setState({
                            error: error.message
                        })
                    }
                } catch(e) {
                    const error = e as FirebaseError; 
                    this.setState({
                        error: error.message
                    })
                }
                
            }
    }

    onBadgeNumberChange(event:ChangeEvent<HTMLInputElement>) {
        this.setState({badgeNumber:event.target.value})
    }

    async onGoogleSignInClickHandler() {
        const provider = new GoogleAuthProvider();
        try {
            await setPersistence(this.auth, browserLocalPersistence)
            await signInWithPopup(this.auth,provider);
            if(this.auth.currentUser) $history.value.push("/admin/dashboard")
        } catch(e) {
            const error = e as FirebaseError; 
            this.setState({
                error: error.message
            })
        }
    }

    public render() {	
        return (
            <div>
                <Background /> 
                <div className="grid justify-center h-screen w-screen content-center text-center">
                    <form onSubmit={e=>e.preventDefault()} className="bg-white p-28 rounded-4xl border-red-500 border-8">
                        <Logo className="text-6xl mb-10" />
                        <h1 className="text-xl font-bold">Please Scan Your Badge</h1>
                        <input type="password" autoFocus autoComplete='off'
                            className="my-5 border-2 rounded-full text-center p-4 border-red-700 w-full" 
                            placeholder="Or type your badge number here" 
                            onChange={this.onBadgeNumberChange.bind(this)}
                            /><br />
                        <button onClick={this.onClickHandler.bind(this)} 
                            className="rounded-full bg-red-700 text-white p-4 font-bold tracking-wider w-full">Sign in</button>
                        <div>{this.state.error}</div>

                        <hr className="w-full my-4 border-red-700"/>
                        <h1 className="font-bold">For Admins Please Click Below</h1>
                        <GoogleButton className="block mx-auto" onClick={this.onGoogleSignInClickHandler.bind(this)}/>
                    </form>
                </div>
            </div>
        );
    }	
}