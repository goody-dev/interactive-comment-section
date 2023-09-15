import { useState } from "react"

function Editor ({onEdit}) {
    const [input, setInput] = useState("");
    const handleChange = (event) => {
        setInput(event.target.value);
        onEdit(input);
    }
    return (
        <>
            <input placeHolder="Add a comment..." className="rounded border border-light-gray p-5 align-text-top" value={input} onChange={handleChange}/>
        </>
    )
}
export default Editor