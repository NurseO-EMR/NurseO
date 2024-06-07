import Logo from '../Components/Nav/TopMenu/Logo';
import { Background } from '../Components/Background';
import SignInButton from '../Components/Form/SignInButton';
import AnonymousSignInButton from '../Components/Form/AnonymousSignInButton';
import { ColorThemeSelector } from '../Components/ColorThemeSelector';
import Head from 'next/head';


export default function Login() {


    return (
        <>
            <Head>
                <title>NurseO EMR</title>
            </Head>
            <div className='standard'>
                <Background />
                <div className="grid justify-center h-screen w-screen content-center text-center">
                    <form onSubmit={e => e.preventDefault()} className="bg-white px-24 py-16 rounded-4xl border-primary border-8">
                        <Logo className="text-6xl mb-10" />
                        <h1 className="text-xl font-bold">Please Scan Your Badge</h1>
                        <input type="password" autoFocus autoComplete='off'
                            className="my-5 border-2 rounded-full text-center p-4 border-primary w-full"
                            placeholder="Or type your badge number here"
                        /><br />
                        <SignInButton onClick={console.log} />
                        {/* <div>{this.state.error}</div> */}

                        <hr className="w-full my-4 border-primary" />
                        <h1 className="font-bold">If you forgot your ID click bellow:</h1>
                        <AnonymousSignInButton className="block mx-auto" onClick={console.log} />
                        <hr className="w-full my-4 border-primary" />
                        <h1 className="font-bold mb-3">Select colors that best fit you</h1>
                        <ColorThemeSelector />
                    </form>
                </div>
            </div>
        </>
    );
}	
