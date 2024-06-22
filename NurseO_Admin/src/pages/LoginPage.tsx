import { useState } from "react";
import { FirebaseError } from "@firebase/app";
import {getAuth, browserLocalPersistence,setPersistence, GoogleAuthProvider, signInWithPopup} from "@firebase/auth";
import GoogleButton from "react-google-button";
import { Logo } from "../Components/Logo";
import { useNavigate } from "react-router-dom";
import { Database } from "../Services/Database";
import { Background } from "../Components/Background";


export function LoginPage() {
    const auth = getAuth()
    const navigate = useNavigate()
    const year = new Date().getFullYear()


    const [error, setError] = useState("")


    const onGoogleSignInClickHandler = async () => {
        const provider = new GoogleAuthProvider();
        try {
            await setPersistence(auth, browserLocalPersistence)
            await signInWithPopup(auth, provider);
            if (auth.currentUser) {
                const db = Database.getInstance();
                const admins = await db.getAdminList();
                if(auth.currentUser.email  && admins.indexOf(auth.currentUser.email) > -1) {
                    navigate("/")
                } else {
                    setError("You are not allowed to sign in here")
                }
            }
        } catch (e) {
            const error = e as FirebaseError;
            setError(error.message)
        }
    }


    return (
        <div>
            <Background />
            <Logo className="text-2xl absolute left-24 top-3" />
            <div className="grid justify-center h-screen w-screen content-center text-center">
                <form onSubmit={e => e.preventDefault()} className="bg-white  rounded-2xl border-red border-8 py-20 w-[40vw]">
                    <Logo className="text-5xl" />
                    <h1 className="my-5 font-bold">Click bellow to sign in as an admin</h1>
                    <GoogleButton className="block mx-auto" onClick={onGoogleSignInClickHandler} />
                    <span>{error}</span>
                </form>
            </div>

            <footer className="absolute bottom-2 left-5">
                <ul className="flex gap-4 underline underline-offset-4">
                    <li>NurseO © {year}</li>
                    <li>Licenses</li>
                    <li>Credits</li>
                </ul>
            </footer>
        </div>
    );
}