import { useState } from "react";
import Editor from "./Editor";

function CommentEditor ({user, onSend}) {
    /*flexbox styling
                
     */
    //A value that triggers the editor to be cleared each time it state changes due to clicking the send button
    const [sent, setSent] = useState(0);

    const [content, setContent] = useState("");
    const handleContent = (content) => {
        setContent(content);
    }
    const handleSend = () => {
        onSend(content);
        setSent(sent+1);
    }
    return (
        <div className="flex flex-col bg-white mx-auto max-w-[90%] sm:max-w-[80%] md:max-w-lg md:flex-row md:align-top justify-stretch shadow-lg m-5 rounded p-5 gap-3">
            <Editor onEdit={handleContent} status={sent}/>
            <div className="flex flex-row justify-between content-center md:contents">
                <img src={user.image.webp} className="h-7 w-7 md:align-start float-left md:order-1"/>
                <button className="bg-moderate-blue hover:bg-light-grayish-blue text-white rounded p-1 w-20 h-10 md:order-3" onClick={handleSend}>SEND</button>
            </div>
        </div>
    )
}
export default CommentEditor;