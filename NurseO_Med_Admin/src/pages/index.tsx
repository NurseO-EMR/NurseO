import { useEffect } from 'react';
import { Logo } from '~/components/Nav/TopMenu/Logo';
import { Button } from '~/components/Form/Button';
import { Background } from '~/components/Background';
import TapOutService from '~/services/TapOutService';
import { ColorThemeSelector } from '~/components/ColorThemeSelector';
import { useRouter } from 'next/navigation';


export default function LoginPage() {
    const router = useRouter()
    
    useEffect(() => TapOutService.initialize(), [])

    const onClickHandler = async () => {
        router.push("/selectPatient")
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
                    /><br />
                    <Button className='rounded-full bg-primary text-white py-2 font-bold tracking-wider w-full' onClick={onClickHandler}>Sign in</Button>

                    <hr className="w-full my-4 border-primary" />
                    <h1 className="font-bold">If you forgot your ID click bellow:</h1>
                    <Button className="rounded-full bg-grayBackground text-white py-2 font-bold tracking-wider w-full block mx-auto" onClick={onClickHandler}>Anonymously Sign In</Button>
                    <hr className="w-full my-4 border-primary"/>
                    <h1 className="font-bold mb-3">Select colors that best fit you</h1>
                    <ColorThemeSelector />
                </form>
            </div>
        </div>
    );
}