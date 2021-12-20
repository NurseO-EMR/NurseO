import React from 'react';

type Props = {
    label: string
}
export default class Name extends React.Component<Props> {

    public render() {	

        return (
            <input type={"submit"}
            className={`bg-red-700 text-white rounded-full px-8 py-1 ml-6 text-center cursor-pointer`}
            value={this.props.label}
            />

        );
    }	
}