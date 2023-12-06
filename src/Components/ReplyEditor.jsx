import { useState } from "react";
import Editor from "./Editor";


function ReplyEditor ({user, onReply, parId, replyingTo}) {
        //A value that triggers the editor to be cleared each time it state changes due to clicking the send button
        const [replySent, setReplySent] = useState(0);

        const [content, setContent] = useState("");
        const handleContent = (content) => {
            setContent(content);
        }
        const handleReply = () => {
            onReply(content, parId, replyingTo);
            setReplySent(replySent+1);
        }
        return (
            <div className="flex flex-col bg-white mx-auto w-[100%] max-w-[90%] sm:max-w-[80%] md:max-w-xl lg:max-w-xl md:flex-row md:align-top justify-stretch shadow-lg m-5 rounded p-5 gap-3">
                <Editor onEdit={handleContent} status={replySent}>Add a reply...</Editor>
                <div className="flex flex-row justify-between content-center md:contents">
                    <img src={user.image.webp} className="h-7 w-7 md:align-start float-left md:order-1"/>
                    <button className="bg-moderate-blue hover:bg-light-grayish-blue text-white rounded p-1 w-20 h-10 md:order-3" onClick={handleReply}>REPLY</button>
                </div>
            </div>
        )
}
export default ReplyEditor