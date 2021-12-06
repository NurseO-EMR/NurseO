import React from 'react';


type Props = React.HTMLProps<HTMLSelectElement> & {
    label: string
};
export default class SelectInput extends React.Component<Props> {

    public render() {	
        return (
            <div className="grid grid-cols-4 w-5/12 my-2 items-center">
                <label htmlFor={this.props.id} className="font-bold">{this.props.label}</label>
                <select onChange={this.props.onChange} className="border-2 border-red-700 rounded-full ml-6 text-center col-span-3 h-7"
                 id={this.props.id} value={this.props.value}>
                    {this.props.children}     
                </select> 
            </div>
        );
    }	
}