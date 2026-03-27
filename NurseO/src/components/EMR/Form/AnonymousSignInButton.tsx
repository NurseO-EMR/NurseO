import React from 'react';
import LoadingButton from './LoadingButton';

type Props = {
    onClick: (wait: () => void, keepGoing: () => void) => void,
    className: string,
};

export default class AnonymousSignInButton extends React.Component<Props> {

    public render() {	
        return (
            <LoadingButton originalText="Anonymously Sign In" loadingText={"loading..."}
                className={`rounded-full bg-grayBackground text-white p-4 font-bold tracking-wider w-full focus:border-white focus:border-8 ${this.props.className}`}
            onClick={this.props.onClick}
            />
        );
    }	
}