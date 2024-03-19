type Props = {
    reportSets: string[] | undefined,
    onTabSelectionHandler: (index: number) => void,
    selectedTab: number
}

export function ReportTabs(props: Props) {
    const tabsButtonClassNames = {
        active: "border-b-2 border-primary py-2 px-5 my-2 text-primary font-bold",
        inactive: "border-b-2 py-2 px-5 my-2"
    };

    return (
        <div className='overflow-x-auto max-w-[56vw]'>
            <div className="flex gap-3 w-max">
                {props.reportSets ?
                    <>
                        {props.reportSets.map((reportSet, i) => (
                            <button
                                className={props.selectedTab === i ? tabsButtonClassNames.active : tabsButtonClassNames.inactive}
                                key={i}
                                onClick={() => props.onTabSelectionHandler(i)}
                            >{reportSet}</button>

                        ))}
                    </>
                    : null}
            </div>
        </div>
    );
}