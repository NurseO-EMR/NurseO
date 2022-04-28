import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { Link } from 'react-router-dom';

type Props = {
    selected?: boolean,
    logo: IconProp,
    text: string,
    href: string
}
export default function SideBarItem(props: Props) {


    const selected = props.href === window.location.pathname;
    return (
        <Link to={props.href}>
            <div className={`py-4 text-gray-200 text-2xl pl-10 cursor-pointer ${selected ? "bg-gray-700 font-bold" : undefined}`}>
                <FontAwesomeIcon icon={props.logo} className="pr-4" />
                <span className='text-xl'>{props.text}</span>
            </div>
        </Link>

    );
}
