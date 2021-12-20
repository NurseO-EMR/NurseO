import React from 'react';
import LabelInputWrapper from './LabelInputWrapper';

type Props = {
    cols: number,
    rows: number,
    id: string,
    label: string,
}

export default class TextArea extends React.Component<Props> {

    public render() {	
        return (
            <LabelInputWrapper>
                <label htmlFor={this.props.id}>{this.props.label}</label>
                <textarea className='border-2 border-red-700 rounded-md ml-6 p-4 col-span-3' id={this.props.id}
                 cols={this.props.cols} rows={this.props.rows}></textarea>
            </LabelInputWrapper>
        );
    }	
}