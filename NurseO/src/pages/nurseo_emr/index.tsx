import Logo from '~/components/EMR/Nav/TopMenu/Logo';
import { Background } from '~/components/EMR/Background';
import SignInButton from '~/components/EMR/Form/SignInButton';
import AnonymousSignInButton from '~/components/EMR/Form/AnonymousSignInButton';
import { ColorThemeSelector } from '~/components/common/ColorThemeSelector';
import Head from 'next/head';
import { useContext, useState } from 'react';
import { GlobalContext } from '~/services/State';
import { signInState } from '~/types/flags';
import { useRouter } from 'next/router';
import { api } from '~/utils/api';


export default function Login() {
    const router = useRouter()
    const { setStudentId } = useContext(GlobalContext)
    const [error, setError] = useState("")
    const [badgeNumber, setBadgeNumber] = useState("")
    const isBarcodeUsedByPatient = api.emr.student_isBarcodeUsedByPatient.useMutation()

    const onSignInHandler = async () => {
        if (badgeNumber.length == 0) {
            setError("Please enter your badge number or sign in anonymously")
            return;
        }

        const barcodeUsedByPatient = await isBarcodeUsedByPatient.mutateAsync({ barcode: badgeNumber })
        if (barcodeUsedByPatient) {
            setError("Please scan your name badge instead of the patient armband")
            return;
        }

        setStudentId(badgeNumber)
        await router.push("/nurseo_emr/SelectPatient")
        return;
    }


    const onAnonymousSignIn = async () => {
        setStudentId(signInState.anonymousSignIn)
        await router.push("/nurseo_emr/SelectPatient")
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
                            onChange={e => setBadgeNumber(e.currentTarget.value)}
                        /><br />
                        <SignInButton onClick={onSignInHandler} />
                        <div>{error}</div>

                        <hr className="w-full my-4 border-primary" />
                        <h1 className="font-bold">If you forgot your ID click below:</h1>
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
