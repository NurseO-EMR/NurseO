// import ReactQuill from "react-quill";
import dynamic from "next/dynamic";
import { useMemo } from "react";
import "react-quill/dist/quill.snow.css";

type Props = {
    value: string
}

export function RichTextViewer(props: Props) {
    // https://github.com/zenoamaro/react-quill/issues/910
    const ReactQuill = useMemo(() => dynamic(() => import("react-quill")), [])

    return <ReactQuill
        value={props.value}
        readOnly={true}
        theme={"bubble"}
    />
}