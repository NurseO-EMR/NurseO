import React from 'react';
import { Link } from 'react-router-dom';

type Props = React.HTMLAttributes<HTMLDivElement> & {
    
}

export default class Logo extends React.Component<Props> {

    public render() {
        return (
            <div>
                <Link to={"/studentView/dashboard"}>
                    <span className={`flex items-center py-4 px-2 font-bold text-2xl ${this.props.className}`}>
                        <span className="tracking-wider">Nurse<abbr title="Open Source">O</abbr>&#160;</span>
                        <span className={`text-primary`}>EMR</span>
                        <span className={`text-sm font-normal`}>&#160;&#160;Alpha</span>
                    </span>
                </Link>
            </div>

        );
    }
}