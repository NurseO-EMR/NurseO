import { type ReactElement } from "react"

type Props = {
  children: ReactElement<HTMLOptionElement>[]
  onChange: (v: string) => void,
  value: string
  label: string
  defaultValue?: string
}

export function Select(props: Props) {
  console.log(props.children)
  return (
    <select className={"flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-slate-200 bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-white data-[placeholder]:text-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-950 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1"}
      value={props.value}
      onChange={e => props.onChange(e.currentTarget.value)}>
      {props.children}
    </select>
  )
}

