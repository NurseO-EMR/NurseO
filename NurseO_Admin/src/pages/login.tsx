import { useState } from "react";
import GoogleButton from "react-google-button";
import { Logo } from "~/components/Logo";
import { Background } from "~/components/Background";
import { signIn, getProviders, useSession } from "next-auth/react";
import { type GetServerSidePropsContext } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "~/server/auth";

export default function LoginPage() {
    
    const year = new Date().getFullYear()
    const session = useSession()

    const [error, setError] = useState("")


    console.log(session)

    return (
        <div>
            <Background />
            <Logo className="text-2xl absolute left-24 top-3" />
            <div className="grid justify-center h-screen w-screen content-center text-center">
                <form onSubmit={e => e.preventDefault()} className="bg-white  rounded-2xl border-red border-8 py-20 w-[40vw]">
                    <Logo className="text-5xl" />
                    <h1 className="my-5 font-bold">Click bellow to sign in as an admin</h1>
                    <div className="flex justify-center">
                        <GoogleButton onClick={()=> signIn('google')} />
                    </div>
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

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const session = await getServerSession(context.req, context.res, authOptions)
  
    // If the user is already logged in, redirect.
    // Note: Make sure not to redirect to the same page
    // To avoid an infinite loop!
    if (session) {
      return { redirect: { destination: "/" } }
    }
  
    const providers = await getProviders()
  
    return {
      props: { providers: providers ?? [] },
    }
  }