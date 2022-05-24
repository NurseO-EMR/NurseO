import { ReactNode } from "react";
import { Background } from "../Components/Background";

type Props = {
    children: ReactNode
}

export default function PageView(props: Props) {
    return (
        <div className="relative w-screen h-screen grid justify-center grid-rows-multiFormWStepsLayout">
            <Background />
            {props.children}
        </div>

    );

}