import { ReactNode } from 'react';
import Nav from '../Components/Nav';
import SideBar from '../Components/SideBar/SideBar';

type Props = {
    children: ReactNode
}

export default function PageView(props: Props) {
    return (

        <div className='grid grid-cols-layout grid-rows-layout'>
            <Nav className='row-start-1 col-start-2 col-span-2' />
            <SideBar className='row-start-1 row-span-2' />
            <div className='grid-cols-10 row-start-2 col-start-2'>{props.children}</div>

        </div>

    );

}