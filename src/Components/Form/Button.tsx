import React, { HTMLProps } from 'react';

type Props = HTMLProps<HTMLButtonElement> & {
    admin?: boolean
};

export default class Button extends React.Component<Props> {

    onClickHandler(e:React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        e.preventDefault();
        if(this.props.onClick) this.props.onClick(e);
    }

    public render() {	

        return (
            <button onClick={this.onClickHandler.bind(this)} 
            className={` ${this.props.className} text-white rounded-full px-8 py-2 ml-6 text-center cursor-pointer bg-${this.props.admin ? "admin" : "primary"}`}
            disabled={this.props.disabled}
            >{this.props.children}</button>

        );
    }	
}