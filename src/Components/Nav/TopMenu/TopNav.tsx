import React from 'react';
import Logo from './Logo';
import {getAuth} from "firebase/auth"

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
        window.location.reload();
    }

    public render() {
        return (
            <nav className={"bg-white shadow-lg " + this.props.className}>
                    <div className="flex justify-around">
                        <Logo />
                        <div className="flex items-center space-x-8">
                            {this.props.children}
                        </div>

                        <div className="flex items-center space-x-3">
                            <span className="font-medium rounded ">
                                {this.auth.currentUser?.displayName ? "Hi " + this.auth.currentUser.displayName : null}&nbsp;
                                <span className="cursor-pointer" onClick={this.onLogoutClickHandler.bind(this)}>Logout</span>
                            </span>
                        </div>
                </div>
            </nav>

        );
    }
}