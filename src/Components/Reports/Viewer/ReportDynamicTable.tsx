import { Report, StudentReport } from "nurse-o-core";
import { useEffect, useState } from "react";
import { Input } from "../../Form/Input";
import { SearchableSelect } from "../../Form/SearchableSelect";
import { Td } from "../../Table/Td";
import { Tr } from "../../Table/Tr";

type Props = {
    setName: string,
    options: Report[],
    onChange: (report:StudentReport) => void
}

export function ReportDynamicTable(props: Props) {
    const sampleTable = [
        ["", "hello2", "hello3"],
        ["", "2", "3"],
        ["","5","6"]
    ]
    const [table, setTable] = useState(sampleTable)
    const [options, setOptions] = useState<{name:string}[]>(props.options.map(o=>{return {name:o.name}}))

    useEffect(()=>{
        setOptions([...props.options.map(o=>{return {name:o.name}})])
    },[props.options])

    const onKeyChangeHandler = (row:number, value:string)=>{
        table[row][0] = value
        updateTable(table)
    }

    const onKeyCreateHandler = (row:number, value:string)=>{
        const key = {name:value}
        options.push(key)
        table[row][0] = value

        setOptions([...options])
        updateTable(table)
    }

    const onTimeupdateHandler=(column:number, value:string) => {
        table[0][column] = value
        updateTable(table)
    }

    const onValueChangeHandler = (row:number, column:number, value:string) =>{
        table[row][column] = value
        updateTable(table)
    }

    const updateTable = (table:string[][])=>{
        // if last row has a key add an empty row
        if(table[table.length-1][0].length > 0) table.push(new Array<string>(table[0].length).fill("",0,table[0].length))
        
        
        // if the last column is filled add another column
        if(table[0][table[0].length-1].length > 0) {
            for(let rowIndex = 0; rowIndex<table.length; rowIndex++) {
                table[rowIndex].push("")
            }
        }

        setTable([...table])
    }

    return <div>
        <table className="w-full relative">
            <thead>
            </thead>
            <tbody>
                {table.map((row,rowIndex)=><Tr key={rowIndex}>
                    {row.map((cell,columnIndex)=>{
                        // top left corner should have nothing 
                        if(rowIndex+columnIndex === 0) return <Td key={columnIndex}><Input hideLabel label={"Empty"} disabled/></Td>
                        //keys
                        else if (columnIndex === 0) return <Td key={columnIndex}><SearchableSelect hideLabel
                                                                 label={""} options={options} value={cell}
                                                                 labelKeys={["name"]} valueKey={"name"} creatable
                                                                 onChange={v=>onKeyChangeHandler(rowIndex,v)}
                                                                 onCreateOption={v=>onKeyCreateHandler(rowIndex,v)}
                                                                 /></Td>

                        // time
                        if(rowIndex === 0) return <Td key={columnIndex}><Input hideLabel label={"time"}
                         value={cell} onChange={e=>onTimeupdateHandler(columnIndex, e.currentTarget.value)}/></Td>

                        // values
                        else return <Td key={columnIndex}><Input hideLabel label={"value"} value={cell}
                                        disabled={table[0][columnIndex].length===0}
                                        onChange={e=>onValueChangeHandler(rowIndex, columnIndex,e.currentTarget.value)}/></Td>
                    })}
                </Tr>)}
            </tbody>
        </table>
    </div>
}
