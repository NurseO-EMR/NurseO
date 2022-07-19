import React from 'react';
import { Logo } from './Logo';
import { getAuth } from "firebase/auth"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import { $history, $providerOrdersAvailable, Button } from 'nurse-o-core';

type Props = {
    className?: string
}
export function TopNav(props: Props) {

    const auth = getAuth()

    const onLogoutClickHandler = async () => {
        await auth.signOut();
        $history.value.push("/")
        window.location.reload();
    }

    const onProviderOrdersClickHandler = () => {
        $providerOrdersAvailable.next(true);
    }

    return (
        <nav className={"bg-white shadow-lg " + props.className}>
            <div className="flex justify-around">
                <Logo className='flex-row text-xl' />
                <div className="flex items-center space-x-8">
                    <Button className='tracking-wider animate-pulse bg-green-900'
                        onClick={onProviderOrdersClickHandler}
                    >
                        Click here if you received provider orders
                    </Button>
                </div>

                <div className="flex items-center space-x-3">
                    <span className="font-medium rounded ">
                        {auth.currentUser?.displayName ? "Hi " + auth.currentUser.displayName : null}&nbsp;
                        <span className='font-bold'> | </span>
                        <span className="cursor-pointer" onClick={onLogoutClickHandler}>
                            <FontAwesomeIcon icon={faSignOutAlt}></FontAwesomeIcon>
                        </span>
                    </span>
                </div>
            </div>
        </nav>

    );
}
