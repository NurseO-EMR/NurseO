import React from 'react';
import {LabelInputWrapper} from './LabelInputWrapper.js';


type Props = React.HTMLProps<HTMLInputElement> & {
    id: string,
    notRequired?: boolean
    admin?: boolean
};
export class Input extends React.Component<Props> {

    public render() {	
        return (
            <LabelInputWrapper className={this.props.className}>
                <label htmlFor={this.props.id}>{this.props.children}</label>
                <input onChange={this.props.onChange} className={`border-2 rounded-full ml-6 text-center col-span-3 h-9 border-${this.props.admin ? "admin" : "primary"}`}
                 id={this.props.id} type={this.props.type} value={this.props.value} required={!this.props.notRequired}
                 list={this.props.list}
                 autoComplete={this.props.autoComplete}
                 /> 
            </LabelInputWrapper>
        );
    }	
}