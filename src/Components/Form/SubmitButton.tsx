import React, { HTMLProps } from 'react';

type Props = HTMLProps<HTMLInputElement> & {
    onClick?: (e:React.MouseEventHandler<HTMLInputElement>)=>void
}
export default class SubmitButton extends React.Component<Props> {

    public render() {	

        return (
            <input type={"submit"}
            onClick={this.props.onClick}
            className={`bg-red-700 text-white rounded-full px-8 py-1 ml-6 text-center cursor-pointer h-9`}
            value={this.props.label}
            />

        );
    }	
}