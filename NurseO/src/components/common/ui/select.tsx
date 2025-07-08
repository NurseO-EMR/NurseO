import { type ReactElement } from "react"

type Props = {
  children: ReactElement<HTMLOptionElement>[] | ReactElement
  onChange: (v: string) => void,
  value: string
  id?: string
  label?: string
}

export function Select(props: Props) {
  return (
    <select className={"flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border px-3 py-2 text-sm shadow-sm border-black data-[placeholder]:text-slate-500 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1"}
      value={props.value}
      onChange={e => props.onChange(e.currentTarget.value)}
      id={props.id}
    >
      {props.children}
    </select>
  )
}

