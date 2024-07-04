import GoogleButton from "react-google-button";
import { Logo } from "~/components/Logo";
import { Background } from "~/components/Background";
import { signIn, getProviders } from "next-auth/react";
import { type GetServerSidePropsContext } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "~/server/auth";
import { userRoles } from "~/types/userRoles";

export default function LoginPage() {
    
    const year = new Date().getFullYear()
 
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

    if (session && session.user.role === userRoles.sim.valueOf()) {
      return { redirect: { destination: "/" } }
    } else if (session?.user) {
        return { redirect: { destination: "/401" } }
    } 
  
    return {
      props: { session },
    }
  }