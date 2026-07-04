import Image from "next/image"
import { signIn, useSession } from "next-auth/react"
import { useRouter } from 'next/navigation';
import { useContext, useEffect } from "react"
import GoogleButton from "react-google-button"
import { Background } from "~/components/common/Background"
import { GlobalContext } from "~/services/State"
import Logo from "~/components/EMR/Nav/TopMenu/Logo"
import { signInState } from "~/types/flags";

export default function Index() {

    const { setStudentId, setLocationId } = useContext(GlobalContext)
    const session = useSession()
    const router = useRouter()

    useEffect(() => {
        if (session.data?.user.id && window) {
            setStudentId(signInState.caseStudy)
            setLocationId(14)
            router.push("/nurseo_emr/SelectPatient")
        }

    }, [router, session.data?.user.id, setLocationId, setStudentId])


    return (
        <div>
            <Background />
            <div className="grid justify-center h-screen w-screen content-center text-center">
                <form className="bg-white py-28 px-60 rounded-4xl border-primary/60 border-8 relative" onSubmit={e => e.preventDefault()}>
                    <Image src={"/nurseo/logo.png"} alt="School Logo" width={90} height={90} className="mx-auto mb-10 w-auto h-auto" />
                    <h1 className="text-3xl">Please sign in with your school account</h1>
                    <div className="flex justify-center mt-4">
                        <GoogleButton onClick={() => signIn('google')} />
                    </div>
                    <Logo className="absolute bottom-0 right-4 text-sm" homePageLink="/casestudy/" />
                </form>
            </div>
        </div>
    );
}
