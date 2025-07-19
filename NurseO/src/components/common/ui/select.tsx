import { type ReactElement } from "react"
import { cn } from "~/lib/utils"

type Props = {
  children: ReactElement<HTMLOptionElement>[] | ReactElement
  onChange: (v: string) => void,
  value?: string | undefined
  id?: string
  label?: string
  disabled?: boolean
  className?: string
}

export function Select(props: Props) {
  return (
    <select className={cn(`flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border px-3 py-2 text-sm shadow-sm border-black 
      data-[placeholder]:text-slate-500 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1`, props.className)}
      value={props.value}
      onChange={e => props.onChange(e.currentTarget.value)}
      id={props.id}
      disabled={props.disabled}
    >
      {props.children}
    </select>
  )
}

