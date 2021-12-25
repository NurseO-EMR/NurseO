import React from 'react';
import LabelInputWrapper from './LabelInputWrapper';


type Props = React.HTMLProps<HTMLSelectElement> & {
    label: string
};
export default class SelectInput extends React.Component<Props> {

    public render() {	
        return (
            <LabelInputWrapper>
                <label htmlFor={this.props.id}>{this.props.label}</label>
                <select onChange={this.props.onChange} className="border-2 border-red-700 rounded-full ml-6 text-center col-span-3 h-9"
                 id={this.props.id} value={this.props.value}>
                    {this.props.children}     
                </select> 
            </LabelInputWrapper>
        );
    }	
}