import React from 'react';
import { $settings } from '../../../Services/State';


type Props = React.HTMLAttributes<HTMLDivElement> & {
    title: string
    preview?: boolean
}

type State = {
    themeColor: string
}
export default class EmptyCard extends React.Component<Props,State> {

    constructor(props:Props){
        super(props);
        this.state = {
            themeColor: this.props.preview ? $settings.value!.previewColor : "red-700"
        }
    }

    componentDidMount() {

    }

    public render() {
        return (

            <div className={this.props.className}>
                <div className={`border-4 border-${this.state.themeColor} mt-4 rounded-lg mx-3 pb-2`}>
                    <h1 className={`w-full bg-${this.state.themeColor} text-white p-4 font-bold`}>{this.props.title}</h1>
                    {this.props.children}
                </div>
            </div>
        );
    }
}