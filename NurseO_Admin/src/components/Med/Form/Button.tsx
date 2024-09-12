import { HTMLProps } from 'react';

type Props = HTMLProps<HTMLButtonElement>;

export function Button(props: Props) {

    const onClickHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        if (props.onClick) props.onClick(e);
    }


    return (
        <button onClick={onClickHandler}
            className={` ${props.className} text-white rounded-full px-8 py-2 text-center cursor-pointer`}
            disabled={props.disabled}
        >{props.children}</button>

    );
}	
