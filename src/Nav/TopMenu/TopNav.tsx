import React from 'react';
import Logo from './Logo';
import {getAuth} from "firebase/auth"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import { $history, $providerOrdersAvailable, Button } from 'nurse-o-core';

type Props = React.HTMLAttributes<HTMLDivElement>
export default class TopNav extends React.Component<Props> {

    private auth;

    constructor(props:Props) {
        super(props);
        this.auth = getAuth();
    }

    async onLogoutClickHandler() {
        const auth = getAuth();
        await auth.signOut();
        $history.value.push("/")
        window.location.reload();
    }

    onProviderOrdersClickHandler() {
        $providerOrdersAvailable.next(true);
    }

    public render() {
        return (
            <nav className={"bg-white shadow-lg " + this.props.className}>
                    <div className="flex justify-around">
                        <Logo className='flex-row text-xl' />
                        <div className="flex items-center space-x-8">
                            <Button className='tracking-wider animate-pulse bg-green-900'
                                onClick={this.onProviderOrdersClickHandler.bind(this)}
                            >
                                Click here if you received provider orders
                            </Button>
                        </div>

                        <div className="flex items-center space-x-3">
                            <span className="font-medium rounded ">
                                {this.auth.currentUser?.displayName ? "Hi " + this.auth.currentUser.displayName : null}&nbsp;
                                <span className='font-bold'> | </span>
                                <span className="cursor-pointer" onClick={this.onLogoutClickHandler.bind(this)}>
                                    <FontAwesomeIcon icon={faSignOutAlt}></FontAwesomeIcon>
                                </span>
                            </span>
                        </div>
                </div>
            </nav>

        );
    }
}