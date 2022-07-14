type Props = {
    className?: string
}

export default function Logo(props:Props) {

    return (
        <div className={props.className}>
            <span className='font-bold text-blue tracking-widest'>NurseO </span>
            <span className='font-bold text-red tracking-widest'>Admin</span>
        </div>
    );
}
