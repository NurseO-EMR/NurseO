import { ReactNode } from "react";
import Nav from "../Components/Nav";
import SideBar from "../Components/SideBar/SideBar";

type Props = {
    children: ReactNode
}

export default function PageView(props: Props) {
    return (

        <div className='grid grid-cols-layout bg-stone-900'>
            {/* <Nav className='row-start-1 col-start-2 col-span-2' /> */}
            <SideBar className='' />
            <div className='mt-20'>{props.children}</div>

        </div>

    );

}