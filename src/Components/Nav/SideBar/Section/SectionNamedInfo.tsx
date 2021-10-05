import React from 'react';

type Props = {
    name: string
}
type State = {}
export default class SectionNamedInfo extends React.Component<Props,State> {

    public render() {	
        return (
            <div className="my-4 pl-4 grid grid-flow-col justify-start w-full grid-cols-4">
                <span className="font-bold mr-4 ">{this.props.name}:</span>
                <span className="col-span-3">{this.props.children}</span>
            </div>

        )
    }	
}