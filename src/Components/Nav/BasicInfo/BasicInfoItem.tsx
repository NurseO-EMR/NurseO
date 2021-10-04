import React from 'react';

type Props = {
    name: string
}
type State = {}
export default class BasicInfoItem extends React.Component<Props,State> {

    public render() {	
        return (
            <div className="w-full bg-gray-200 my-4 pl-4">
                <span className="text-primary font-bold mr-4">{this.props.name}:</span>
                <span className="text-secondary">{this.props.children}</span>
            </div>

        )
    }	
}