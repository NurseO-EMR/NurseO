import { ReactNode, useEffect } from "react";
import {getAuth} from "firebase/auth"
import { Background } from "../Components/Background";
import { Nav } from "../Components/Nav/Nav";
import { useNavigate } from "react-router-dom";
import { AnnouncementViewer } from "../Components/AnnouncementViewer";

type Props = {
    children: ReactNode
}

export default function PageView(props: Props) {
    const year = new Date().getFullYear()
    const navigate = useNavigate()
    
    useEffect(()=>{
        const auth = getAuth();
        if(!auth.currentUser) navigate("/login");
    }, [navigate])

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