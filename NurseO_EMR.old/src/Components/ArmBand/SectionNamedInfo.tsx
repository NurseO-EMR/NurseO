import React from 'react';

type Props = React.HTMLAttributes<HTMLDivElement> & {
    name: string,
    boldedKey?:boolean,
    boldedValue?:boolean,
    keyClassNames?: string,
    valueClassNames?: string,
    removeColon?: boolean
}
type State = {}
export default class SectionNamedInfo extends React.Component<Props,State> {

    public render() {	
        return (
            <div className="text-base h-3">
                <span className={`
                ${this.props.boldedKey ? "font-bold text-primary" : ""} 
                ${this.props.keyClassNames} 
                `
            }>
                {this.props.name} 
                {this.props.removeColon ? "" : ": "}
             </span>

            <span className={`
            ${this.props.boldedValue ? "font-bold text-primary" : ""} 
            ${this.props.valueClassNames} 
            `}>{this.props.children}</span>
            </div>

        )
    }	
}