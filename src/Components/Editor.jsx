import { useState } from "react"

function Editor ({onEdit}) {
    const [input, setInput] = useState("");
    const handleChange = (event) => {
        setInput(event.target.value);
        onEdit(input);
    }
    return (
        <>
            <input placeholder="Add a comment..." className="rounded border border-light-gray h-24" value={input} onChange={handleChange}/>
        </>
    )
}
export default Editor