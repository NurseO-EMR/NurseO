import backgroundImage from "~/assets/background.jpg";
import Image from "next/image"

export function Background() {

    return (
        <div className="overflow-hidden absolute top-0 left-0 w-screen h-screen -z-10">
            <Image src={backgroundImage} alt="background picture of a mannequin" className="absolute z-background bg-cover top-0 left-0 w-screen h-screen" />
            <div className="absolute z-hue w-screen h-screen top-0s left-0 opacity-60  bg-gradient-to-br from-primary  to-heroImageBackgroundHueEnd"></div>
        </div>

    );
}	
