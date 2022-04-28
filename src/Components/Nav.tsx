import React from 'react';

type Props = {
    className: string
}
export default function Nav(props: Props) {

    return (
        <nav className={`h-16 bg-stone-900 ${props.className}`}>

        </nav>
    );
}
