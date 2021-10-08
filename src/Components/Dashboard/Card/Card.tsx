import React from 'react';


type Props = React.HTMLAttributes<HTMLDivElement> & {
    title: string
}
export default class Card extends React.Component<Props> {

    public render() {	
        return (
            <div className={`border-4 border-red-500 mt-4 rounded-lg ${this.props.className}`}>
                <h1 className="w-full bg-red-500 text-white p-4 font-bold">{this.props.title}</h1>
                <table className="border-2 w-full">
                    {this.props.children}
                </table>
            </div>
        );
    }	
}