type Props = {
    numberOfRows: number,
    drawersPerRow: number,
    names: string[]
}

export function StationPreviewer(props: Props) {


    const getLables = () => {
        const station: JSX.Element[] = []
        let oldName = "";
        let lastIndex = 0;
        for (let col = 0; col < props.names.length; col++) {
            let addedIndex = 1;
            if (oldName === props.names[col]) addedIndex = lastIndex + 1;
            for (let row = 0; row < props.numberOfRows; row++) {
                station.push(<div className="border grid justify-center items-center">{props.names[col]}{row + addedIndex}</div>)
                lastIndex = addedIndex + row
            }
            oldName = props.names[col]
        }
        return station
    }



    return <div className="bg-gray w-[40rem] h-[40rem] m-auto">
        <div className="grid h-full w-full"
            style={{
                gridTemplateRows: `repeat(${props.numberOfRows}, minmax(0, 1fr))`,
                gridTemplateColumns: `repeat(${props.drawersPerRow}, minmax(0, 1fr))`
            }}>


            {getLables()}


        </div>

    </div>
}