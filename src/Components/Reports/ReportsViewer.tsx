import React from 'react';
import { StudentReport, Note } from 'nurse-o-core';
import EmptyCard from '../Dashboard/Card/EmptyCard';
import { filter, groupBy, uniq } from "lodash"
import ReportTabs from './ReportTabs';
import { $patient } from '../../Services/State';

type Props = {
    studentReport: StudentReport[],
    className?: string,
    title: string,
    showNotes?: boolean
}

type State = {
    selectedTab: number
}
export default class ReportsViewer extends React.Component<Props, State> {

    private filteredSets;
    private notes: Note[]

    constructor(props: Props) {
        super(props);
        this.state = {
            selectedTab: 0
        }
        this.filteredSets = this.getSets();
        this.notes = $patient.value?.notes || [];
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
        const headers = vitals.map(vital => vital.vitalName);
        const uniqueHeaders = uniq(headers);
        return uniqueHeaders;
    }

    //this function is expensive and might require optimization letter
    getTimes() {
        if (!this.filteredSets[this.state.selectedTab]) return [];

        const vitals = this.filteredSets[this.state.selectedTab][1];
        const times = vitals.map(vital => `${vital.date} ${vital.time}`);
        return uniq(times.sort());
    }

    //this function is expensive and might require optimization letter
    getRows() {
        const map = this.makeReportsMap();
        const rows: JSX.Element[] = [];
        let i = 0
        if (map.size === 0) {
            const row = (
                <tr key={i} className="odd:bg-gray-100 even:bg-gray-300 h-14">
                    <td key={-1}>No Data available</td>
                </tr>
            )
            rows.push(row);
        } else {
            map.forEach((valuesArray, name) => {
                //replacing all the empty cells with empty string values 
                for(let i = 0; i<valuesArray.length; i++) {
                    const value = valuesArray[i]
                    if(value === undefined) valuesArray[i] = ""
                }
                //making the row
                const row = (
                    <tr key={i} className="odd:bg-gray-100 even:bg-gray-300 h-14">
                        <td key={-1}>{name}</td>
                        {valuesArray.map((value, i) => <td key={i}>{value}</td>)}
                    </tr>
                )
                rows.push(row);
                i++;
            })
        }

        return rows;
    }

    getNotes(selectedTab: number) {
        if (!$patient.value) return [];
        const notes = $patient.value.notes;
        const sets = this.getSets();

        if (!sets[selectedTab]) return [];

        const filteredNotes = filter(notes, { reportName: sets[selectedTab][1][0].setName })
        return filteredNotes.map((note, i) => (
            <div key={i} className="border-primary mx-20 py-6 px-4 border-2 my-3 flex">
                <div className="border-r-2 mr-4 pr-4 border-primary font-bold w-1/12">{note.date}</div>
                <div className="w-11/12">{note.note}</div>
            </div>
        ))

    }


    makeReportsMap() {
        if (!this.filteredSets[this.state.selectedTab]) return new Map<string, string[]>();

        const vitals = this.filteredSets[this.state.selectedTab][1];
        const times = this.getTimes();
        let map = new Map<string, string[]>();

        for (const vital of vitals) {
            const formattedTime = `${vital.date} ${vital.time}`;
            if (!map.has(vital.vitalName)) {
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

                    {this.props.studentReport.length > 0 ?
                        <table className="w-full table-auto text-center">
                            <thead>
                                <tr className="">
                                    <th key={-1}>{this.props.title}</th>
                                    {this.getTimes().map((time, i) =>
                                        <th key={i}>{time}</th>
                                    )}
                                </tr>
                            </thead>
                            <tbody>
                                {this.getRows()}
                            </tbody>
                        </table>
                        : <h1 className='font-bold text-center pt-5 pb-4'>No Data Available</h1>}
                    {this.props.showNotes ? this.getNotes(this.state.selectedTab) : null}

                </EmptyCard>
            </div>

        );
    }
}