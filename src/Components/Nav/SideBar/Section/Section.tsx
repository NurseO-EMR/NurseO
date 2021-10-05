import React from 'react';

type Props = {
    title: string
}
type State = {}

export default class Section extends React.Component<Props,State> {

    public render() {
        return (
            <div className="p-2 border-t-4 border-b-4 border-dotted">
                <h1 className="font-bold text-center text-primary  text-lg" >{this.props.title}</h1>
                {this.props.children}
            </div>

        );
    }
}