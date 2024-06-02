import { useEffect, useState } from 'react';
import { FirebaseError } from "@firebase/app";
import {
    getAuth, signInWithEmailAndPassword, browserLocalPersistence,
    setPersistence, inMemoryPersistence,
    createUserWithEmailAndPassword, signInAnonymously
} from "@firebase/auth";
import { Logo } from '../Nav/TopMenu/Logo';
import { useNavigate } from 'react-router-dom';
import { Button } from '../Components/Form/Button';
import { Background } from '../Components/Background';
import TapOutService from '../Services/TapOutService';
import { ColorThemeSelector } from '../Components/ColorThemeSelector';


export function LoginPage() {
    const auth = getAuth()
    // connectAuthEmulator(auth, "http://localhost:9099")
    const navigate = useNavigate()

    const postLoginPath = "/selectPatient"

    const [badgeNumber, setBadgeNumber] = useState("")
    const [error, setError] = useState("")

    
    useEffect(() => TapOutService.initialize(), [])

    const onClickHandler = async () => {
        try {
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
                    setError(error.message)
                }
            } catch (e) {
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
                <form onSubmit={e => e.preventDefault()} className="bg-white px-20 py-8 rounded-3xl border-primary/80 border-8">
                    <Logo className="text-6xl mb-10 flex py-4 px-2 flex-col gap-4" />
                    <h1 className="text-xl font-bold">Please Scan Your Badge</h1>
                    <input type="password" autoFocus autoComplete='off'
                        className="my-5 border-2 rounded-full text-center p-4 border-primary w-full"
                        placeholder="Or type your badge number here"
                        onChange={e => setBadgeNumber(e.target.value)}
                    /><br />
                    <Button className='rounded-full bg-primary text-white py-2 font-bold tracking-wider w-full' onClick={onClickHandler}>Sign in</Button>
                    <div>{error}</div>

                    <hr className="w-full my-4 border-primary" />
                    <h1 className="font-bold">If you forgot your ID click bellow:</h1>
                    <Button className="rounded-full bg-grayBackground text-white py-2 font-bold tracking-wider w-full block mx-auto" onClick={onAnonymousSignInClickHandler}>Anonymously Sign In</Button>
                    <hr className="w-full my-4 border-primary"/>
                    <h1 className="font-bold mb-3">Select colors that best fit you</h1>
                    <ColorThemeSelector />
                </form>
            </div>
        </div>
    );
}