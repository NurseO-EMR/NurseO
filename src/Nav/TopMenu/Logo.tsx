import React from 'react';
import { Link } from 'react-router-dom';

type Props = React.HTMLAttributes<HTMLDivElement> & {

}

export default class Logo extends React.Component<Props> {

    public render() {
        return (
            <div>
                <Link to={"/"}>
                    <div className={`flex items-center py-4 px-2 font-bold ${this.props.className}`}>
                        <div className="tracking-wider">Nurse<abbr title="Open Source">O</abbr>&#160;</div>
                        <div className={`text-primary`}>Medication Administration
                            <span className={`text-sm font-normal text-black`}>&#160;&#160;Alpha</span>
                        </div>
                    </div>
                </Link>
            </div>

        );
    }
}