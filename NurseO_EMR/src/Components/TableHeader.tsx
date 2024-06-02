import React from 'react';

export default class TableHeader extends React.Component {

    public render() {	
        return (
            <h1 className=" tracking-wider my-4 rounded-full text-center text-2xl py-3 bg-grayBackground text-white">{this.props.children}</h1>

        );
    }	
}