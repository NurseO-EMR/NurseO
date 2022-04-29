import React from 'react';

type Props = {
    className?: string,
    hasLabel?: boolean
}

export class LabelInputWrapper extends React.Component<Props> {

    public render() {
        return (
            <div className={`grid w-11/12 my-2 items-center font-bold grid-flow-col
                             ${this.props.hasLabel ? "grid-cols-4" : null}
                             ${this.props.className}`}>
                {this.props.children}
            </div>

        );
    }
}