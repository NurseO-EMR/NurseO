import Logo from '../Components/Nav/TopMenu/Logo';
import { Background } from '../Components/Background';
import SignInButton from '../Components/Form/SignInButton';
import AnonymousSignInButton from '../Components/Form/AnonymousSignInButton';
import { ColorThemeSelector } from '../Components/ColorThemeSelector';
import Head from 'next/head';
import { useContext, useState } from 'react';
import { GlobalContext } from '~/Services/State';
import { signInState } from '~/types/flags';
import { useRouter } from 'next/router';


export default function Login() {
    const router = useRouter()
    const {setStudentId} = useContext(GlobalContext)
    const [error, setError] = useState("")
    const [badgeNumber, setBadgeNumber] = useState("")

    const onSignInHandler = async ()=>{
        if(badgeNumber.length == 0) {
            setError("Please enter your badge number or sign in anonymously")
        } else {
            setStudentId(badgeNumber)
            await router.push("/SelectPatient")
        }
    }


    const onAnonymousSignIn = async ()=>{
        setStudentId(signInState.anonymousSignIn)
        await router.push("/SelectPatient")
    }
    
    return (
        <>
            <Head>
                <title>NurseO EMR</title>
            </Head>
            <div>
                <Background />
                <div className="grid justify-center h-screen w-screen content-center text-center">
                    <form onSubmit={e => e.preventDefault()} className="bg-white px-24 py-16 rounded-4xl border-primary border-8">
                        <Logo className="text-6xl mb-10" />
                        <h1 className="text-xl font-bold">Please Scan Your Badge</h1>
                        <input type="password" autoFocus autoComplete='off'
                            className="my-5 border-2 rounded-full text-center p-4 border-primary w-full"
                            placeholder="Or type your badge number here"
                            onChange={e=>setBadgeNumber(e.currentTarget.value)}
                        /><br />
                        <SignInButton onClick={onSignInHandler} />
                        <div>{error}</div>

                        <hr className="w-full my-4 border-primary" />
                        <h1 className="font-bold">If you forgot your ID click bellow:</h1>
                        <AnonymousSignInButton className="block mx-auto" onClick={onAnonymousSignIn} />
                        <hr className="w-full my-4 border-primary" />
                        <h1 className="font-bold mb-3">Select colors that best fit you</h1>
                        <ColorThemeSelector />
                    </form>
                </div>
            </div>
        </>
    );
}	
