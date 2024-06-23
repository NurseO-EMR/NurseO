import { useEffect, type ReactNode } from "react";
import { Background } from "~/components/Background";
import { Nav } from "~/components/nav/Nav";
import { AnnouncementViewer } from "~/components/AnnouncementViewer";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

type Props = {
    children: ReactNode
}

export default function PageView(props: Props) {
    const session = useSession()
    const router = useRouter()
    useEffect(()=>{
        // this code runs on the client but it is merely for user convince, the security check happens at login page and every trpc request on the server side
        if(!session.data?.user) router.push("/login") 
    })

    const year = new Date().getFullYear()
    
    return (
        <div className="relative grid justify-center min-h-screen">
            <Background></Background>

            <Nav />
            {props.children}

            <footer className="absolute bottom-2 left-5">
                <ul className="flex gap-4 underline underline-offset-4">
                    <li>NurseO © {year}</li>
                    <li>Version 2.4.1</li>
                </ul>
            </footer>


            <AnnouncementViewer />

        </div>

    );

}