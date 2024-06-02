import React from 'react';
import backgroundImage from "./../assets/background.jpg";

export default class Background extends React.Component {

    public render() {	
        return (
            <div className="overflow-hidden">
                <img src={backgroundImage} alt="stethoscope held against the sun" className="absolute z-background bg-cover top-0 left-0 w-screen h-screen" />
                <div className="absolute z-hue w-screen h-screen top-0 left-0 opacity-60  bg-gradient-to-br from-primary  to-heroImageBackgroundHueEnd"></div>
            </div>                

        );
    }	
}