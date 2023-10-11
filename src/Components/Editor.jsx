import { useEffect, useState } from "react"

function Editor ({onEdit}) {
    const [input, setInput] = useState("");
    const handleChange = (event) => {
        setInput(event.target.value);
    }

    //To update the application state immediately there is change in input
    useEffect(()=>
        onEdit(input)
    , [input])

    return (
        <>
            <textarea placeholder="Add a comment..." className="rounded border-[1.8px] border-light-gray hover:border-moderate-blue cursor-pointer h-auto break-words px-5 py-2 overflow-y-auto" value={input} onChange={handleChange}/>
        </>
    )
}
export default Editor