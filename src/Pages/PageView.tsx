import { ReactNode } from "react";
import { Background } from "../Components/Background";
import { Nav } from "../Components/nav/Nav";

type Props = {
    children: ReactNode
}

export default function PageView(props: Props) {
    const year = new Date().getFullYear()

    return (
        <div className="relative w-screen h-screen grid justify-center grid-rows-multiFormWStepsLayout">
            <Background></Background>

            <Nav />
            {props.children}

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