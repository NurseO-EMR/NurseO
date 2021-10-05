import React from 'react';
import { FirebaseApp, initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, Auth } from "firebase/auth";
import firebaseConfig from "./../firebaseConfig.json";
type Props = {}
type State = {}

export default class Login extends React.Component<Props,State> {

    private app:FirebaseApp;
    private auth:Auth;

    constructor(props:Props) {
        super(props);
        this.app = initializeApp(firebaseConfig);
        this.auth = getAuth(this.app);
    }

    onClickHandler() {
        createUserWithEmailAndPassword(this.auth, "aspasp1998@gmail.com", "password").then((userCred)=>{
            console.log(userCred.user)
        }).catch((error)=>{
            console.log(error.message);
        })
    }

    public render() {	
        return (
            <div>
                <input type="text" placeholder="email" />
                <input type="password" placeholder="password" />
                <button onClick={this.onClickHandler.bind(this)}>Login</button>
            </div>
        );
    }	
}