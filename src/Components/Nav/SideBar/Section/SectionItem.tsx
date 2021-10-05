import React from 'react';

type Props = {}
type State = {}
export default class SectionItem extends React.Component<Props,State> {

    public render() {	
        return (
            <div className="my-4 pl-4 list-item">
                <span className="">{this.props.children}</span>
            </div>

        )
    }	
}