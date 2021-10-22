import React from 'react';


type Props = React.HTMLAttributes<HTMLDivElement> & {
    title: string
}
export default class EmptyCard extends React.Component<Props> {

    public render() {
        return (
            <div className={`mx-2 border-l-8 border-r-8 ${this.props.className} border-4 border-red-700 mt-4 rounded-lg`}>
                <h1 className="w-full bg-red-700 text-white p-4 font-bold">{this.props.title}</h1>
                {/* <table className="border-2 w-full"> */}
                    {this.props.children}
                {/* </table> */}
            </div>
        );
    }	
}