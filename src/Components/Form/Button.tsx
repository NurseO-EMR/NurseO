import React, { HTMLProps } from 'react';

type Props = HTMLProps<HTMLButtonElement>;

export default class Button extends React.Component<Props> {

    onClickHandler(e:React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        e.preventDefault();
        if(this.props.onClick) this.props.onClick(e);
    }

    public render() {	

        return (
            <button onClick={this.onClickHandler.bind(this)} 
            className={`bg-red-700 text-white rounded-full px-8 py-1 ml-6 text-center col-span-3 ${this.props.className}`}
            >{this.props.children}</button>

        );
    }	
}