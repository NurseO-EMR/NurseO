import React from 'react';

export default class SideNavHeader extends React.Component {

    public render() {	
        return (
            <h1 className="font-bold p-4 bg-red-500 text-white cursor-pointer hover:bg-red-600 transition-all">{this.props.children}</h1>
        );
    }	
}