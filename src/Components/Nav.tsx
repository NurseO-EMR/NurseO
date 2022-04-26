import React from 'react';

type Props = {
    className: string
}
export default class Nav extends React.Component<Props> {

    render() {
        return (
            <nav className={`h-16 bg-stone-900 ${this.props.className}`}>
                
            </nav>
        );
    }
}