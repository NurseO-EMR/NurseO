import { type ReactNode } from "react";
import { Background } from "~/components/Background";
import { Nav } from "~/components/nav/Nav";
import { AnnouncementViewer } from "~/components/AnnouncementViewer";

type Props = {
    children: ReactNode
}

export default function PageView(props: Props) {

    const year = new Date().getFullYear()

    return (
        <div className="relative grid justify-center min-h-screen">
            <Background></Background>

            <Nav />
            {props.children}

            <footer className="absolute bottom-2 left-5">
                <ul className="flex gap-4 underline underline-offset-4">
                    <li>NurseO © {year}</li>
                    <li>Version 3.1.0</li>
                </ul>
            </footer>


            <AnnouncementViewer />

        </div>

    );

}