import React from 'react';
import { Link, Router } from 'react-router-dom';
import { $history } from '../Services/State.js';

type Props = React.HTMLAttributes<HTMLDivElement> & {
    
}

export class Logo extends React.Component<Props> {

    public render() {
        return (
            <Router history={$history.value}>
                <Link to={"/"}>
                    <span className={`flex items-center py-4 px-2 font-bold text-2xl ${this.props.className}`}>
                        <span className="tracking-wider">Nurse<abbr title="Open Source">O</abbr>&#160;</span>
                        <span className={`text-primary`}>EMR</span>
                        <span className={`text-sm font-normal`}>&#160;&#160;Alpha</span>
                    </span>
                </Link>
            </Router>

        );
    }
}