import { Background } from "~/components/Admin/Background";
import { Logo } from "~/components/Admin/Logo";
import { signOut, useSession } from "next-auth/react";
import { Button } from "~/components/Admin/Form/Button";


export default function Error401NotAuthorizedPage() {
    const year = new Date().getFullYear()
    const session = useSession()

    return (
        <div>
            <Background />
            <Logo className="text-2xl absolute left-24 top-3" />
            <div className="grid justify-center h-screen w-screen content-center text-center">
                <form onSubmit={e => e.preventDefault()} className="bg-white  rounded-2xl border-red border-8 py-20 w-[40vw] px-10">
                    <Logo className="text-5xl" />
                    <h1 className="my-5 font-bold">Hi {session.data?.user.name}</h1>
                    <h1 className="my-5 font-bold">You are not authorized to access this page</h1>
                    <Button className="bg-blue w-1/2 rounded-full" onClick={() => signOut({ callbackUrl: "/login" })}>Sign out</Button>
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