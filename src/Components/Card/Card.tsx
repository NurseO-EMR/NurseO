import React from 'react';
import {EmptyCard} from './EmptyCard.js';


type Props = React.HTMLAttributes<HTMLDivElement> & {
    title: string,
    admin?: boolean
}
export class Card extends React.Component<Props> {

    public render() {
        return (
            <EmptyCard title={this.props.title} className={this.props.className} admin={this.props.admin}>
                    <table className="w-full ">
                        {this.props.children}
                    </table>
            </EmptyCard>
        );
    }	
}