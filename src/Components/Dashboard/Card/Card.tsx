import React from 'react';


type Props = {
    title: string
}
export default class Card extends React.Component<Props> {

    public render() {	
        return (
            <div className="border-4 border-red-500">
                <h1 className="w-full bg-red-500 text-white p-4 font-bold">{this.props.title}</h1>
                {this.props.children}
            </div>
        );
    }	
}