import React, { ChangeEvent } from 'react';
import { FirebaseError } from "firebase/app";
import { getAuth, Auth, signInWithEmailAndPassword, browserLocalPersistence, 
    setPersistence, GoogleAuthProvider, signInWithPopup, inMemoryPersistence,
    createUserWithEmailAndPassword, signInAnonymously } from "firebase/auth";
import GoogleButton from 'react-google-button';
import {Logo} from '../Components/Logo.js';
import { $history } from '../Services/State.js';
import {Background} from '../Components/Background.js';
import {SignInButton} from '../Components/Form/SignInButton.js';
import {AnonymousSignInButton} from '../Components/Form/AnonymousSignInButton.js';
type Props = {}
type State = {
    badgeNumber: string,
    error: string,
}

export class Login extends React.Component<Props,State> {
    private auth:Auth;

    constructor(props:Props) {
        super(props);
        this.auth = getAuth();
        this.state = {
            badgeNumber: "",
            error: ""
        }
    }

    async onClickHandler(wait: () => void, keepGoing: () => void): Promise<void> {
            try {
                wait();
                await setPersistence(this.auth, inMemoryPersistence)
                await signInWithEmailAndPassword(this.auth, `${this.state.badgeNumber}@nurseO.app`, this.state.badgeNumber )
                if(this.auth.currentUser) $history.value.push("/studentView/selectPatient");
            } catch(e) {
                try {
                    const error = e as FirebaseError; 
                    if(error.code === "auth/user-not-found") {
                        await createUserWithEmailAndPassword(this.auth, `${this.state.badgeNumber}@nurseo.app`, this.state.badgeNumber)
                        await signInWithEmailAndPassword(this.auth, `${this.state.badgeNumber}@nurseo.app`, this.state.badgeNumber )
                        if(this.auth.currentUser) $history.value.push("/studentView/selectPatient");
                    } else {
                        keepGoing();
                        this.setState({
                            error: error.message
                        })
                    }
                } catch(e) {
                    keepGoing();
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

    async onAnonymousSignInClickHandler() {
        try {
            await setPersistence(this.auth, browserLocalPersistence)
            await signInAnonymously(this.auth);
            if(this.auth.currentUser) $history.value.push("/studentView/selectPatient");
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
                        <SignInButton onClick={this.onClickHandler.bind(this)} />
                        <div>{this.state.error}</div>

                        <hr className="w-full my-4 border-red-700"/>
                        <h1 className="font-bold">If you forgot your ID click bellow:</h1>
                        <AnonymousSignInButton className="block mx-auto" onClick={this.onAnonymousSignInClickHandler.bind(this)}/>

                        <hr className="w-full my-4 border-red-700"/>
                        <h1 className="font-bold">For Admins Please Click Below</h1>
                        <GoogleButton className="block mx-auto" onClick={this.onGoogleSignInClickHandler.bind(this)}/>
                    </form>
                </div>
            </div>
        );
    }	
}