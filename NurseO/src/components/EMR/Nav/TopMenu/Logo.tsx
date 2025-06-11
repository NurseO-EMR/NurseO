import Link from 'next/link';
import React from 'react';

type Props = React.HTMLAttributes<HTMLDivElement> & {
    homePageLink: string
}

export default function Logo(props: Props) {

    return (
        <div>
            <Link href={props.homePageLink}>
                <span className={`flex items-center py-4 px-2 font-bold text-2xl ${props.className}`}>
                    <span className="tracking-wider">Nurse<abbr title="Open Source">O</abbr>&#160;</span>
                    <span className={`text-primary`}>EMR</span>
                    <span className={`text-sm font-normal`}>&#160;&#160;Alpha</span>
                </span>
            </Link>
        </div>

    );
}
