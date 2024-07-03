// import ReactQuill from "react-quill";
import dynamic from "next/dynamic";
import { useMemo } from "react";
import "react-quill/dist/quill.snow.css";

type Props = {
    className?: string,
    onChange: (html: string)=>void,
    value: string
}

export function RichTextArea(props:Props) {
  // https://github.com/zenoamaro/react-quill/issues/910
  const ReactQuill = useMemo(()=>dynamic(()=>import("react-quill")),[])
    const modules = {
        toolbar: [
          ["bold", "italic", "underline","strike"],
          [{ "color": [] }, { "background": [] }],
          ["clean"],
        ],
      }

    return <ReactQuill onChange={e=>props.onChange(e)} value={props.value}
    modules={modules}
    className={`h-40 bg-white border ${props.className}`}/>
}