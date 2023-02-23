import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

type Props = {
    className?: string,
    onChange: (html: string)=>void,
    value: string
}

export function RichTextArea(props:Props) {
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