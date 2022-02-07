import React from 'react';


export default class SideNav extends React.Component<React.HTMLAttributes<HTMLDivElement>> {
    
    public render() {
        return (
            <div className={"shadow-lg h-full pt-1 bg-gray-600 " + this.props.className }>
                {this.props.children}
                
            </div>

        );
    }
}