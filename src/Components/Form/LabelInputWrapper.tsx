import React from 'react';

type Props = {
    className?: string
}

export default class LabelInputWrapper extends React.Component<Props> {

    public render() {
        return (
            <div className={`grid grid-cols-4 w-11/12 my-2 items-center font-bold ${this.props.className}`}>
                {this.props.children}
            </div>

        );
    }
}