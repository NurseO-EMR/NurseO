import {useRef} from "react";
// modified from https://gist.github.com/carpben/de968e377cbac0ffbdefe1ab56237573
// modified from https://stackoverflow.com/questions/28889826/how-to-set-focus-on-an-input-field-after-rendering

export function useFocus() {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const htmlElRef = useRef<any>()
	const setFocus = () => {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
		const currentEl = htmlElRef.current
		// eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
		currentEl?.focus()
	}
	return [htmlElRef, setFocus] as const
}