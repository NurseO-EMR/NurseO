import React, { ReactNode } from 'react';
import SideBarItem from './SideBarItem';

type Props = {
    title: string, 
    children?: ReactNode

}
export default class Category extends React.Component<Props> {

    render() {
        return (
            <div>
                <div className={`text-gray-500 tracking-widest text-xl pl-5 mb-2`}>{this.props.title}</div>
                {this.props.children}
            </div>
        );
    }
}