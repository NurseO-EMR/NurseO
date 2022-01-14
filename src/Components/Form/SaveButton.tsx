import React from 'react';
import LoadingButton from './LoadingButton';

type Props = {
    onClick: (wait: () => void, keepGoing: () => void) => void,
    className?: string,
    admin?: boolean,
};

export default class SaveButton extends React.Component<Props> {

    public render() {	
        return (
            <LoadingButton onClick={this.props.onClick} className={` ${this.props.className} text-white rounded-full px-8 py-2 ml-6 text-center cursor-pointer bg-${this.props.admin ? "admin" : "primary"}`} originalText="Save" loadingText={"Saving..."} />

        );
    }	
}