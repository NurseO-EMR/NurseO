import React from 'react';
import Logo from './Logo';
import { getAuth } from "firebase/auth"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import { useHistory } from 'react-router-dom';

type Props = React.HTMLAttributes<HTMLDivElement>
export default function TopNav(props: Props) {

    const auth = getAuth()
    const history = useHistory();

    const onLogoutClickHandler = async () => {
        const auth = getAuth();
        await auth.signOut();
        history.push("/")
        window.location.reload();
    }

    return (
        <nav className={"bg-white shadow-lg " + props.className}>
            <div className="flex justify-around">
                <Logo />
                <div className="flex items-center space-x-8">
                    {props.children}
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
