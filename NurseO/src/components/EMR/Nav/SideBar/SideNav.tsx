import React from 'react';


export default class SideNav extends React.Component<React.HTMLAttributes<HTMLDivElement>> {
    
    public render() {
        return (
            <nav className={"shadow-lg h-full pt-1 bg-grayBackground " + this.props.className} aria-label='Left Side Nav Bar'>
                {this.props.children}
            </nav>
        );  
    }
}