import React from 'react';

export default class SideNavItem extends React.Component {

    public render() {
        return (
            <div className="p-2 bg-gray-500 text-white cursor-pointer hover:bg-gray-600 transition-all">{this.props.children}</div>
        );
    }
}