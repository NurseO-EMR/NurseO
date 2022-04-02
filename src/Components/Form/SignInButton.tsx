import React from 'react';
import {LoadingButton} from './LoadingButton.js';

type Props = {
    onClick: (wait: () => void, keepGoing: () => void) => void 
};

export class SignInButton extends React.Component<Props> {

    public render() {	
        return (
            <LoadingButton originalText="Sign In" loadingText={"loading..."}
            className="rounded-full bg-red-700 text-white p-4 font-bold tracking-wider w-full"
            onClick={this.props.onClick}
            />
        );
    }	
}