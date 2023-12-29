import { useState } from "react";
import Editor from "./Editor";

function CommentEditor ({user, onSend}) {
    //A value that triggers the editor to be cleared each time it state changes due to clicking the send button
    const [sent, setSent] = useState(0);

    const [content, setContent] = useState(null);
    const handleContent = (content) => {
        setContent(content);
    }
    const handleSend = () => {
        if(content) {
            onSend(content);
            setSent(sent+1);
        }
    }
    return (
        <div className="flex flex-col bg-white mx-auto max-w-[90vw] sm:w-[70vw] md:max-w-xl lg:max-w-xl sm:flex-row sm:align-top justify-stretch shadow-lg mt-3 mb-5 rounded p-5 gap-3">
            <Editor onEdit={handleContent} status={sent}>Add a comment...</Editor>
            <div className="flex flex-row justify-between content-center sm:contents">
                <img src={user.image.webp} alt="Your Avatar" className="h-7 w-7 sm:align-start float-left sm:order-1"/>
                <button aria-label="Click to Send Comment" className="bg-moderate-blue hover:bg-light-grayish-blue text-white rounded p-1 w-20 h-fit sm:h-7 md:h-10 sm:order-3 font-[500]" onClick={handleSend}>SEND</button>
            </div>
        </div>
    )
}
export default CommentEditor;