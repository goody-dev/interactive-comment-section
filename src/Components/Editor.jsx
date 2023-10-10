import { useState } from "react"

function Editor ({onEdit}) {
    const [input, setInput] = useState("");
    const handleChange = (event) => {
        setInput(event.target.value);
        onEdit(input);
    }
    return (
        <>
            <textarea placeholder="Add a comment..." className="rounded border border-light-gray h-auto break-words px-5 py-2 overflow-y-auto" value={input} onChange={handleChange}/>
        </>
    )
}
export default Editor