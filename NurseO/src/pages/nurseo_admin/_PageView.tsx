import { type ReactNode } from "react";
import { Background } from "~/components/Admin/Background";
import { Nav } from "~/components/Admin/nav/Nav";
import appInfo from "~/core/appInfo.json"

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
                    <li>Version {appInfo.version}</li>
                </ul>
            </footer>

        </div>

    );

}