import Link from 'next/link';
import React from 'react';

type Props = {
    href:string,
    className?: string | null,
    admin?: boolean,
    children: string
}
export default class SideNavHeader extends React.Component<Props> {

    public render() {	
        return (
            <Link href={this.props.href}>
                <span className={`font-bold p-4 text-white cursor-pointer block transition-all ${this.props.admin ? "even:bg-admin border-b-2 border-white hover:bg-grayBackground/90" : "bg-primary hover:bg-primary/80"} ${this.props.className}`}>
                        {this.props.children}
                </span>
            </Link>
        );
    }	
}