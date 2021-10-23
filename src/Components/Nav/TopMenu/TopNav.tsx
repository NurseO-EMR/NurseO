import React from 'react';

export default class TopNav extends React.Component<React.HTMLAttributes<HTMLDivElement>> {

    public render() {
        return (
            <nav className={"bg-white shadow-lg " + this.props.className}>
                    <div className="flex justify-around">
                        <div>
                            <span className="flex items-center py-4 px-2 font-bold text-2xl ">
                                <span>SimpleSim&#160;</span>
                                <span className="text-primary">EMR</span>
                            </span>
                        </div>

                        <div className="flex items-center space-x-8">
                            <input type="text" className="border-2 rounded-full w-144 h-10 text-center" placeholder="Scan Patient BarCode"/>
                        </div>

                        <div className="flex items-center space-x-3">
                            <span className="font-medium rounded hover:bg-red-500 transition duration-300">Hi Madison</span>
                        </div>
                </div>
            </nav>

        );
    }
}