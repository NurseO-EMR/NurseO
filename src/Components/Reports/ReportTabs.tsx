import { groupBy } from 'lodash';
import React from 'react';

type Props = {
    reportSets: string[] | undefined,
    onTabSelectionHandler: (index: number) => void,
    selectedTab: number
}

export default class ReportTabs extends React.Component<Props> {
    private readonly tabsButtonClassNames;
    constructor(props: Props) {
        super(props);
        this.tabsButtonClassNames = {
            active: "border-b-2 border-primary py-2 px-5 my-2 text-primary font-bold",
            inactive: "border-b-2 py-2 px-5 my-2"
        }
    }

    getSets() {
        const sets = groupBy(this.props.reportSets, "setName");
        return Object.entries(sets);
    }

    public render() {
        return (
            <div className='overflow-x-auto '>
                <div className="flex gap-3 w-max">
                    {this.props.reportSets ?
                        <>
                            {this.props.reportSets.map((reportSet, i) => (
                                <button
                                    className={this.props.selectedTab === i ? this.tabsButtonClassNames.active : this.tabsButtonClassNames.inactive}
                                    key={i}
                                    onClick={() => this.props.onTabSelectionHandler(i)}
                                >{reportSet}</button>

                            ))}
                        </>
                        : null}
                </div>
            </div>
        );
    }
}