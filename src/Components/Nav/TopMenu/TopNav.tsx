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

    public render() {
        return (
            <nav className={"bg-white shadow-lg " + this.props.className}>
                    <div className="flex justify-around">
                        <Logo />
                        <div className="flex items-center space-x-8">
                            {this.props.children}
                        </div>

                        <div className="flex items-center space-x-3">
                            <span className="font-medium rounded hover:bg-red-500 transition duration-300">
                                {this.auth.currentUser?.displayName ? "Hi" + this.auth.currentUser.displayName : null}
                            </span>
                        </div>
                </div>
            </nav>

        );
    }
}