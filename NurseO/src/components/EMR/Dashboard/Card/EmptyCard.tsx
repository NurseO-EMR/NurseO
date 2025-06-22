import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { DialogTrigger } from "~/components/common/ui/dialog";
import React from 'react';
import { DialogWrapper } from '~/components/common/dialogWrapper';


type Props = React.HTMLAttributes<HTMLDivElement> & {
    title: string
    editable?: boolean,
    onEditClick?: () => void
}

export default function EmptyCard(props: Props) {

    return (
        <DialogWrapper wrap={!!props.editable} >
        <div className={props.className}>
            <div className={`border-4 border-primary mt-4 rounded-lg mx-3 pb-2 relative`}>
                    {props.editable && <DialogTrigger className="absolute text-white right-4 top-2 cursor-pointer text-lg"><FontAwesomeIcon icon={faPenToSquare} /></DialogTrigger>}
                <h1 className={`w-full bg-primary text-white p-4 font-bold`}>{props.title}</h1>
                {props.children}
            </div>
        </div>
        </DialogWrapper>
    );
}
