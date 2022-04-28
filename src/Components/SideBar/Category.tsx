import { ReactNode } from 'react';

type Props = {
    title: string,
    children?: ReactNode

}
export default function Category(props: Props) {

    return (
        <div>
            <div className={`text-gray-500 tracking-widest text-xl pl-5 mb-2`}>{props.title}</div>
            {props.children}
        </div>
    );
}
