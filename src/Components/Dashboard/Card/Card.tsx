import React from 'react';
import EmptyCard from './EmptyCard';


type Props = React.HTMLAttributes<HTMLDivElement> & {
    title: string,
    preview?: boolean
}
export default class Card extends React.Component<Props> {

    public render() {
        return (
            <EmptyCard title={this.props.title} className={this.props.className} preview={this.props.preview}>
                    <table className="border-2 w-full ">
                        {this.props.children}
                    </table>
            </EmptyCard>
        );
    }	
}