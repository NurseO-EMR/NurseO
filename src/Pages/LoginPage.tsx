import { useState } from 'react';
import { FirebaseError } from "@firebase/app";
import {
    getAuth, signInWithEmailAndPassword, browserLocalPersistence,
    setPersistence, inMemoryPersistence,
    createUserWithEmailAndPassword, signInAnonymously, connectAuthEmulator
} from "@firebase/auth";
import { Background, SignInButton, AnonymousSignInButton } from 'nurse-o-core';
import {Logo} from '../Nav/TopMenu/Logo';
import { useNavigate } from 'react-router-dom';


export function LoginPage() {
    const auth = getAuth()
    connectAuthEmulator(auth, "http://localhost:9099")
    const navigate = useNavigate()

    const postLoginPath = "/selectPatient"

    const [badgeNumber, setBadgeNumber] = useState("")
    const [error, setError] = useState("")


    const onClickHandler = async (wait: () => void, keepGoing: () => void) => {
        try {
            wait();
            await setPersistence(auth, inMemoryPersistence)
            await signInWithEmailAndPassword(auth, `${badgeNumber}@nurseO.app`, badgeNumber)
            if (auth.currentUser) navigate(postLoginPath)
        } catch (e) {
            try {
                const error = e as FirebaseError;
                if (error.code === "auth/user-not-found") {
                    await createUserWithEmailAndPassword(auth, `${badgeNumber}@nurseo.app`, badgeNumber)
                    await signInWithEmailAndPassword(auth, `${badgeNumber}@nurseo.app`, badgeNumber)
                    if (auth.currentUser) navigate(postLoginPath)
                } else {
                    keepGoing();
                    setError(error.message)
                }
            } catch (e) {
                keepGoing();
                const error = e as FirebaseError;
                setError(error.message)
            }

        }
    }


    const onAnonymousSignInClickHandler = async () => {
        try {
            await setPersistence(auth, browserLocalPersistence)
            await signInAnonymously(auth);
            if (auth.currentUser) navigate(postLoginPath)
        } catch (e) {
            const error = e as FirebaseError;
            setError(error.message)
        }
    }

    return (
        <div>
            <Background />
            <div className="grid justify-center h-screen w-screen content-center text-center">
                <form onSubmit={e => e.preventDefault()} className="bg-white p-28 rounded-4xl border-red-500 border-8">
                    <Logo className="text-6xl mb-10 flex py-4 px-2 flex-col gap-4" />
                    <h1 className="text-xl font-bold">Please Scan Your Badge</h1>
                    <input type="password" autoFocus autoComplete='off'
                        className="my-5 border-2 rounded-full text-center p-4 border-red-700 w-full"
                        placeholder="Or type your badge number here"
                        onChange={e => setBadgeNumber(e.target.value)}
                    /><br />
                    <SignInButton onClick={onClickHandler} />
                    <div>{error}</div>

                    <hr className="w-full my-4 border-red-700" />
                    <h1 className="font-bold">If you forgot your ID click bellow:</h1>
                    <AnonymousSignInButton className="block mx-auto" onClick={onAnonymousSignInClickHandler} />
                </form>
            </div>
        </div>
    );
}