import {useRef} from "react";
// modified from https://gist.github.com/carpben/de968e377cbac0ffbdefe1ab56237573
// modified from https://stackoverflow.com/questions/28889826/how-to-set-focus-on-an-input-field-after-rendering

export function useFocus() {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const htmlElRef = useRef<any>()
	const setFocus = () => {
		const currentEl = htmlElRef.current
		currentEl && currentEl.focus()
	}
	return [htmlElRef, setFocus] as const
}