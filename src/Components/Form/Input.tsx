import React from 'react';
import LabelInputWrapper from './LabelInputWrapper';


type Props = React.HTMLProps<HTMLInputElement> & {
    id: string,
};
export default class Input extends React.Component<Props> {

    public render() {	
        return (
            <LabelInputWrapper className={this.props.className}>
                <label htmlFor={this.props.id}>{this.props.children}</label>
                <input onChange={this.props.onChange} className="border-2 border-red-700 rounded-full ml-6 text-center col-span-3"
                 id={this.props.id} type={this.props.type} value={this.props.value}/> 
            </LabelInputWrapper>
        );
    }	
}