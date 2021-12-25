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
            className={`bg-primary text-white rounded-full px-8 py-2 ml-6 text-center cursor-pointer ${this.props.className}`}
            >{this.props.children}</button>

        );
    }	
}