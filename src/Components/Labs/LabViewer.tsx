import React from 'react';
import EmptyCard from '../Dashboard/Card/EmptyCard';

type Props = {
    docLink?: string
}

export default class LabViewer extends React.Component<Props> {

    public render() {
        return (
            <EmptyCard title='Lab Viewer'>
                {this.props.docLink ?
                    <iframe className='w-full h-screen' src={this.props.docLink} title='Lab Document'></iframe> :
                    <h1 className='text-center font-bold my-5'>No Labs Available</h1>
                }
            </EmptyCard>
        );
    }
}