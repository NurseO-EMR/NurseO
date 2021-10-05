import React from 'react';
import MenuItem from './MenuItem';

export default class TopNav extends React.Component<React.HTMLAttributes<HTMLDivElement>> {

    public render() {
        return (
            <nav className={"bg-white shadow-lg " + this.props.className}>
                <div className="max-w-screen-2xl mx-auto px-4">
                    <div className="flex justify-between">
                        <div>
                            <span className="flex items-center py-4 px-2">
                                <span className=" font-bold text-lg">SimpleSim&#160;</span>
                                <span className="font-bold text-lg text-primary">EMR</span>
                            </span>
                        </div>

                        <div className="flex items-center space-x-8">
                            <MenuItem>Home</MenuItem>
                            <MenuItem>Mar</MenuItem>
                            <MenuItem>Vitals</MenuItem>
                            <MenuItem>Labs</MenuItem>
                        </div>

                        <div className="flex items-center space-x-3">
                            <span className="font-medium rounded hover:bg-red-500 transition duration-300">Hi Madison</span>
                        </div>
                    </div>
                </div>
            </nav>

        );
    }
}