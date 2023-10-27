import { useEffect, useState } from "react"

function Editor ({onEdit, status}) {
    const [input, setInput] = useState("");
    const handleChange = (event) => {
        setInput(event.target.value);
    }

    //To update the application state immediately there is change in input
    useEffect(()=>
        onEdit(input)
    , [input])

    useEffect(()=>
        setInput('')
    , [status])

    return (
        <>
            <textarea placeholder="Add a comment..." className="rounded border-[1.8px] border-light-gray hover:border-moderate-blue cursor-pointer break-words px-5 py-2 overflow-y-auto md:w-full md:order-2" value={input} onChange={handleChange}/>
        </>
    )
}
export default Editor