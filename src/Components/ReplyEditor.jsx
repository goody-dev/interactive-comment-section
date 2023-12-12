import { useState } from "react";
import Editor from "./Editor";


function ReplyEditor ({user, onReply, parentId, replyingTo, handleReplyEditor}) {
        //A value that triggers the editor to be cleared each time it state changes due to clicking the send button
        const [replySent, setReplySent] = useState(0);

        const [content, setContent] = useState(null);
        const handleContent = (content) => {
            setContent(content);
        }
        const handleReply = () => {
            if(content) {
                onReply(content, parentId, replyingTo);
                setReplySent(replySent+1);
                handleReplyEditor(false);
            }
        }

        return (
            <div className="flex flex-col bg-white mx-auto w-[100%] max-w-[90%] sm:max-w-xl lg:max-w-xl sm:flex-row sm:align-top justify-stretch shadow-lg rounded p-5 gap-3">
                <Editor onEdit={handleContent} status={replySent} >{"@"+replyingTo}</Editor>
                <div className="flex flex-row justify-between content-center sm:contents">
                    <img src={user.image.webp} className="h-7 w-7 sm:align-start float-left sm:order-1"/>
                    <button className="bg-moderate-blue hover:bg-light-grayish-blue text-white rounded p-1 w-20 h-fit md:h-10 sm:order-3" onClick={handleReply}>REPLY</button>
                </div>
            </div>
        )
}
export default ReplyEditor