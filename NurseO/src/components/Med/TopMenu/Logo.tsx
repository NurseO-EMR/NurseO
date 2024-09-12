import Link from 'next/link';
import React from 'react';

type Props = {
    className?: string
}

export function Logo(props: Props) {

    return (
        <div>
            <Link href={"/"}>
                <div className={`flex items-center py-4 px-2 font-bold ${props.className}`}>
                    <div className="tracking-wider">Nurse<abbr title="Open Source">O</abbr>&#160;</div>
                    <div className={`text-primary`}>Medication Administration
                        <span className={`text-sm font-normal text-black`}>&#160;&#160;Alpha</span>
                    </div>
                </div>
            </Link>
        </div>

    );
}
