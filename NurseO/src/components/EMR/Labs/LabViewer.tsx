import React from 'react';
import EmptyCard from './../Dashboard/Card/EmptyCard';

type Props = {
    docLink?: string | null,
    title: string,
}

export default class LabViewer extends React.Component<Props> {

    public render() {
        return (
            <EmptyCard title={this.props.title}>
                {this.props.docLink ?
                    <iframe className='w-full h-screen' src={this.props.docLink} title='Lab Document'></iframe> :
                    <h2 className='text-center font-bold my-5'>No Labs Available</h2>
                }
            </EmptyCard>
        );
    }
}