import React from 'react';
import { Link } from 'react-router-dom';

type Props = {
    href:string,
}
export default class SideNavHeader extends React.Component<Props> {

    public render() {	
        return (
            <Link to={this.props.href}>
                <h1 className="font-bold p-4 bg-red-700 text-white cursor-pointer hover:bg-red-800 transition-all">
                        {this.props.children}
                </h1>
            </Link>
        );
    }	
}