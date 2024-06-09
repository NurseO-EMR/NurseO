import Link from 'next/link';
import React from 'react';

type Props = {
    href: string,
    children: string
}
export default function SideNavItem(props: Props) {

    return (
        <Link href={props.href}>
            <div className="p-2 bg-grayBackground text-white cursor-pointer hover:brightness-110 transition-all">{props.children}</div>
        </Link>
    );
}
