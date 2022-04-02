import React from 'react';

type Props = {
    loadingText: string,
    originalText: string,
    onClick: (wait: () => void, keepGoing: () => void) => void,
    className?: string
}

type State = {
    text: string
}

export class LoadingButton extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            text: this.props.originalText
        }
    }

    onClick() {
        this.props.onClick(this.wait.bind(this), this.keepGoing.bind(this));
    }

    wait() {
        this.setState({
            text: this.props.loadingText
        })
    }

    keepGoing() {
        this.setState({
            text: this.props.originalText
        })
    }

    public render() {
        return (
            <button className={this.props.className} onClick={this.onClick.bind(this)}>{this.state.text}</button>
        );
    }
}