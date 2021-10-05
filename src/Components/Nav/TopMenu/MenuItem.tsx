import React from 'react';

export default class MenuItem extends React.Component {

    public render() {	
        return (
            <span className="px-2 font-bold cursor-pointer">{this.props.children}</span>

        );
    }	
}