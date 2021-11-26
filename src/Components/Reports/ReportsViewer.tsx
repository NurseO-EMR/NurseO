import React from 'react';
import { StudentReport } from '../../Types/Report';
import EmptyCard from '../Dashboard/Card/EmptyCard';
import { filter, groupBy, uniq } from "lodash"
import ReportTabs from './ReportTabs';

type Props = {
    studentReport: StudentReport[],
    className?: string,
    title: string,
}

type State = {
    selectedTab: number
}
export default class ReportsViewer extends React.Component<Props, State> {

    private filteredSets;

    constructor(props: Props) {
        super(props);
        this.state = {
            selectedTab: 0
        }
        this.filteredSets = this.getSets();
        this.getRows();
    }

    onTabSelectionHandler(selectedTab: number) {
        this.setState({ selectedTab })
    }

    getSets() {
        const sets = groupBy(this.props.studentReport, "setName");
        return Object.entries(sets);
    }

    getVitalNames() {
        const set = this.filteredSets[this.state.selectedTab];
        const vitals = set[1];
        const headers = vitals.map(vital=>vital.vitalName);
        const uniqueHeaders = uniq(headers);
        return uniqueHeaders;
    }

    //this function is expensive and might require optimization letter
    getTimes() {
        if(!this.filteredSets[this.state.selectedTab]) return [];

        const vitals = this.filteredSets[this.state.selectedTab][1];
        console.log(filter(vitals, {date:"2021-10-25", time: "22:50"}))
        const times = vitals.map(vital=> `${vital.date} ${vital.time}`);
        return uniq(times.sort());
    }

    getRows() {
        const map = this.makeVitalsMap();
        const rows:JSX.Element[] = [];
        map.forEach((valuesArray,name)=>{
            const row = (
                <tr>
                    <td key={-1}>{name}</td>
                    {valuesArray.map((value, i)=> <td key={i}>{value}</td> )}
                </tr>
            )
            rows.push(row);
        })
        return rows;
    }


    makeVitalsMap() {
        if(!this.filteredSets[this.state.selectedTab]) return new Map<string, string[]>();

        const vitals = this.filteredSets[this.state.selectedTab][1];
        const times = this.getTimes();
        let map = new Map<string, string[]>();

        for(const vital of vitals) {
            const formattedTime = `${vital.date} ${vital.time}`;
            if(!map.has(vital.vitalName)) {
                const vitalsArray = new Array<string>(times.length);
                const index = times.indexOf(formattedTime);
                vitalsArray[index] = vital.value;
                map.set(vital.vitalName, vitalsArray);
            } else {
                const vitalsArray = map.get(vital.vitalName)!;
                const index = times.indexOf(formattedTime);
                vitalsArray[index] = vital.value;
                map.set(vital.vitalName, vitalsArray);
            }
        }
        return map;
    }


    public render() {
        return (
            <div className={this.props.className}>
                <EmptyCard title={this.props.title}>
                    <ReportTabs selectedTab={this.state.selectedTab} onTabSelectionHandler={this.onTabSelectionHandler.bind(this)}
                        reportSets={this.filteredSets.map(set => set[0])} />

                    <table className="w-full table-auto text-center">
                        <thead>
                                <tr>
                                    <th key={-1}>Vital</th>
                                    {this.getTimes().map((time, i) =>
                                        <th key={i}>{time}</th>
                                    )}
                                </tr>
                        </thead>
                        <tbody>
                            {this.getRows()}
                        </tbody>
                    </table>

                </EmptyCard>
            </div>

        );
    }
}