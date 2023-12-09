import { useEffect, useState } from "react"

function Editor ({onEdit, status, children}) {
    const [input, setInput] = useState("");
    const handleChange = (event) => {
        setInput(event.target.value);
    }

    const allowEdit = () => {
        setInput(children);
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
            <textarea onFocus={allowEdit} placeholder={children} className="rounded border-[1.8px] border-light-gray hover:border-moderate-blue cursor-pointer break-words px-5 py-2 overflow-y-auto md:w-full md:order-2" value={input} onChange={handleChange}/>
        </>
    )
}
export default Editor