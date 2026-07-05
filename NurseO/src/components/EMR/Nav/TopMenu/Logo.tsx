import Link from 'next/link';
import React from 'react';

type Props = React.HTMLAttributes<HTMLDivElement> & {
    homePageLink: string
}

export default function Logo(props: Props) {

    return (
        <div>
            <Link href={props.homePageLink} aria-label='NurseO EMR Logo'>
                <h1 className={`flex items-center py-4 px-2 font-bold text-2xl ${props.className}`}>
                    <span className="tracking-wider">Nurse<abbr title="Open Source">O</abbr></span>
                    <span className={`text-primary`}>EMR</span>
                </h1>
            </Link>
        </div>

    );
}
